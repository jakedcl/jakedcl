'use client'

import { Project } from '@/types/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProjectCard({ project }: { project: Project }) {
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
