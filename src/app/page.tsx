import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { Project } from '@/types/sanity';
import Image from 'next/image';
import ProjectCard from './components/ProjectCard';

async function getProjects(): Promise<Project[]> {
  const projects = await client.fetch(projectsQuery);
  console.log('Projects loaded:', projects.length);
  projects.forEach((project: Project, index: number) => {
    console.log(`Project ${index + 1}:`, project.title, 'Photos:', project.photos?.length || 0);
  });
  return projects;
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
