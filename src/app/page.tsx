'use client'

import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { Project } from '@/types/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { useEffect, useState } from 'react';

async function getProjects(): Promise<Project[]> {
  const projects = await client.fetch(projectsQuery);
  console.log('Projects loaded:', projects.length);
  projects.forEach((project, index) => {
    console.log(`Project ${index + 1}:`, project.title, 'Photos:', project.photos?.length || 0);
  });
  return projects;
}

function ProjectCard({ project }: { project: Project }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    const carousel = document.getElementById(`carousel-${project._id}`);
    if (!carousel) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
      const needsScroll = scrollWidth > clientWidth;

      setCanScrollLeft(canScrollLeft);
      setCanScrollRight(canScrollRight);
      setNeedsScroll(needsScroll);
    };

    checkScroll();
    carousel.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      carousel.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [project._id]);

  const scrollLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const carousel = document.getElementById(`carousel-${project._id}`);
    if (carousel) {
      // Scroll by 2 photos worth (2 * photo width + gap)
      const scrollAmount = 2 * (window.innerWidth < 768 ? 128 + 12 : 192 + 12); // 2 photos + gaps
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const carousel = document.getElementById(`carousel-${project._id}`);
    if (carousel) {
      // Scroll by 2 photos worth (2 * photo width + gap)
      const scrollAmount = 2 * (window.innerWidth < 768 ? 128 + 12 : 192 + 12); // 2 photos + gaps
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cardContent = (
    <>
      {/* Project Title */}
      <div className="text-left mb-4">
        <PortableText 
          value={project.title} 
          components={{
            block: {
              normal: ({children}) => <span className="text-xl md:text-2xl font-bold text-black">{children}</span>,
              h1: ({children}) => <span className="text-2xl md:text-3xl font-bold text-black">{children}</span>,
              h2: ({children}) => <span className="text-xl md:text-2xl font-bold text-black">{children}</span>,
              h3: ({children}) => <span className="text-xl md:text-2xl font-semibold text-black">{children}</span>,
            }
          }}
        />
      </div>

      {/* Project Photos Carousel */}
      <div className="w-full h-48 bg-gray-50/80 rounded-xl overflow-hidden relative border border-gray-200/30">
        {project.photos && project.photos.length > 0 ? (
          <>
            <div className="flex overflow-x-auto gap-3 h-full scrollbar-hide p-3" id={`carousel-${project._id}`}>
              {project.photos.map((photo, index) => (
                <div key={index} className="flex-shrink-0 w-32 md:w-48 h-full">
                  <Image
                    src={photo.asset.url}
                    alt={photo.alt || `Project image ${index + 1}`}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            
            {/* Left scroll indicator */}
            {needsScroll && canScrollLeft && (
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none flex items-center justify-center">
                <button
                  onClick={scrollLeft}
                  className="w-6 h-6 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Right scroll indicator */}
            {needsScroll && canScrollRight && (
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none flex items-center justify-center">
                <button
                  onClick={scrollRight}
                  className="w-6 h-6 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No images
          </div>
        )}
      </div>
    </>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm border border-white/20">
      {cardContent}
    </div>
  );
}

export default async function Home() {
  const projects = await getProjects();


  const socialLinks = [
    { text: '@jakedcl on instagram', link: 'https://instagram.com/jakedcl' },
    { text: 'jakedcl on github', link: 'https://github.com/jakedcl' },
    { text: 'jakedcl on youtube', link: 'https://youtube.com/@jakedcl' },
    { text: '@jacobdcl linkedin', link: 'https://linkedin.com/in/jacobdcl' },
  ];

  return (
    <div className="min-h-screen bg-white flex" style={{backgroundColor: '#ffffff'}}>
      {/* Fixed Gradient Sidebar - Smaller */}
      <nav className="fixed left-0 top-0 h-full w-28 bg-gradient-to-b from-red-500 to-yellow-400 hidden md:flex flex-col justify-center items-center z-50 shadow-lg">
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <Image src="/icons/web.png" alt="Web Dev" width={72} height={72} className="w-18 h-18 object-contain" />
        </div>
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <Image src="/icons/maps.png" alt="Maps" width={72} height={72} className="w-18 h-18 object-contain" />
        </div>
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <Image src="/icons/media.png" alt="Media" width={72} height={72} className="w-18 h-18 object-contain" />
        </div>
      </nav>

      {/* Main Content - Adjusted for smaller sidebar */}
      <main className="flex-1 ml-0 md:ml-28 relative overflow-x-hidden pb-24 md:pb-0">
        {/* Top right corner text */}
        <div className="absolute top-4 right-4 text-gray-400 text-sm font-medium">
          jakedcl
        </div>
        {/* Home Section */}
        <section className="flex flex-col justify-center p-6 backdrop-blur-sm border border-gray-200/30 rounded-2xl m-8" style={{backgroundColor: '#f0f0f0', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'}}>
          <h1 className="text-3xl font-bold text-black mb-6">welcome, look around</h1>
          <div className="space-y-3 mb-6">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base text-black hover:text-gray-600 transition-colors"
              >
                {item.text}
              </a>
            ))}
          </div>
        </section>

        {/* Web Dev Section */}
        <section className="p-4 md:p-6 backdrop-blur-sm border border-gray-200/30 rounded-2xl m-4 md:m-8" style={{backgroundColor: '#f0f0f0', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'}}>
          <h2 className="text-2xl font-bold text-black mb-6">🌐 web dev</h2>
          
          {/* Projects Grid */}
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

      </main>

      {/* Mobile Bottom Navigation - Larger */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-orange-500 to-red-500 flex justify-around items-center z-50 md:hidden">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <Image src="/icons/web.png" alt="Web Dev" width={60} height={60} className="w-15 h-15 object-contain" />
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <Image src="/icons/maps.png" alt="Maps" width={60} height={60} className="w-15 h-15 object-contain" />
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <Image src="/icons/media.png" alt="Media" width={60} height={60} className="w-15 h-15 object-contain" />
        </div>
      </nav>
    </div>
  );
}
