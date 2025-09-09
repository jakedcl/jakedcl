import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { Project } from '@/types/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

async function getProjects(): Promise<Project[]> {
  return await client.fetch(projectsQuery);
}

export default async function Home() {
  const projects = await getProjects();


  const socialLinks = [
    { text: '@jakedcl on instagram', link: 'https://instagram.com/jakedcl' },
    { text: '@bannquet on instagram', link: 'https://instagram.com/bannquet' },
    { text: '@jakedcl on youtube', link: 'https://youtube.com/@jakedcl' },
    { text: '@jacobdcl on github', link: 'https://github.com/jacobdcl' },
    { text: '@jacobdcl on linkedin', link: 'https://linkedin.com/in/jacobdcl' },
  ];

  return (
    <div className="min-h-screen bg-white flex" style={{backgroundColor: '#ffffff'}}>
      {/* Fixed Gradient Sidebar - Smaller */}
      <nav className="fixed left-0 top-0 h-full w-28 bg-gradient-to-b from-red-500 to-yellow-400 hidden md:flex flex-col justify-center items-center z-50 shadow-lg">
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <img src="/icons/home.png" alt="Home" className="w-18 h-18 object-contain" />
        </div>
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <img src="/icons/web.png" alt="Web Dev" className="w-18 h-18 object-contain" />
        </div>
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <img src="/icons/maps.png" alt="Maps" className="w-18 h-18 object-contain" />
        </div>
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <img src="/icons/media.png" alt="Media" className="w-18 h-18 object-contain" />
        </div>
        <div className="w-20 h-20 flex items-center justify-center mb-8 rounded-xl transition-all duration-300 hover:scale-110">
          <img src="/icons/blog.png" alt="Blog" className="w-18 h-18 object-contain" />
        </div>
      </nav>

      {/* Main Content - Adjusted for smaller sidebar */}
      <main className="flex-1 ml-0 md:ml-28 relative">
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
          {/* 3D Object placeholder */}
          <div className="w-72 h-72 bg-gray-100 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-gray-400 text-base">3D Model Coming Soon</span>
          </div>
        </section>

        {/* Web Dev Section */}
        <section className="p-6 backdrop-blur-sm border border-gray-200/30 rounded-2xl m-8" style={{backgroundColor: '#f0f0f0', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'}}>
          <h2 className="text-2xl font-bold text-black mb-6">🌐 web dev</h2>
          <div className="flex overflow-x-auto gap-6 pb-4">
            {projects.map((project) => (
              <div key={project._id} className="flex-shrink-0 w-80">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity duration-200"
                  >
                    {/* Photo Carousel */}
                    <div className="w-full h-48 bg-gray-100 rounded-xl mb-3 overflow-hidden">
                      {project.photos && project.photos.length > 0 ? (
                        <Image
                          src={project.photos[0].asset.url}
                          alt={project.photos[0].alt || 'Project image'}
                          width={320}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    {/* Title */}
                    <div className="text-left">
                      <PortableText 
                        value={project.title} 
                        components={{
                          block: {
                            normal: ({children}) => <span className="text-base font-medium text-black">{children}</span>,
                            h1: ({children}) => <span className="text-lg font-bold text-black">{children}</span>,
                            h2: ({children}) => <span className="text-base font-bold text-black">{children}</span>,
                            h3: ({children}) => <span className="text-base font-semibold text-black">{children}</span>,
                          }
                        }}
                      />
                    </div>
                  </a>
                ) : (
                  <div>
                    {/* Photo Carousel */}
                    <div className="w-full h-48 bg-gray-100 rounded-xl mb-3 overflow-hidden">
                      {project.photos && project.photos.length > 0 ? (
                        <Image
                          src={project.photos[0].asset.url}
                          alt={project.photos[0].alt || 'Project image'}
                          width={320}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    {/* Title */}
                    <div className="text-left">
                      <PortableText 
                        value={project.title} 
                        components={{
                          block: {
                            normal: ({children}) => <span className="text-base font-medium text-black">{children}</span>,
                            h1: ({children}) => <span className="text-lg font-bold text-black">{children}</span>,
                            h2: ({children}) => <span className="text-base font-bold text-black">{children}</span>,
                            h3: ({children}) => <span className="text-base font-semibold text-black">{children}</span>,
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Mobile Bottom Navigation - Larger */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-orange-500 to-red-500 flex justify-around items-center z-50 md:hidden">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <img src="/icons/home.png" alt="Home" className="w-15 h-15 object-contain" />
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <img src="/icons/web.png" alt="Web Dev" className="w-15 h-15 object-contain" />
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <img src="/icons/maps.png" alt="Maps" className="w-15 h-15 object-contain" />
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <img src="/icons/media.png" alt="Media" className="w-15 h-15 object-contain" />
        </div>
        <div className="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300">
          <img src="/icons/blog.png" alt="Blog" className="w-15 h-15 object-contain" />
        </div>
      </nav>
    </div>
  );
}
