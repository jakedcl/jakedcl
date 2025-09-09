import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';
import { Project } from '@/types/sanity';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<Project>(projectBySlugQuery, {
    slug,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-medium hover:text-accent-blue transition-colors">
            Jake DCL
          </Link>
          <div className="hidden md:flex space-x-6 text-sm">
            <Link href="/projects" className="hover:text-accent-blue transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-accent-blue transition-colors">About</Link>
            <Link href="/studio" className="hover:text-accent-blue transition-colors">Studio</Link>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a 
            href="mailto:jakedcl73@gmail.com" 
            className="text-sm hover:text-accent-blue transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-4xl font-light mb-4">
              <PortableText
                value={project.title}
                components={{
                  block: {
                    normal: ({children}) => <span className="text-4xl font-light">{children}</span>,
                    h1: ({children}) => <h1 className="text-4xl font-light">{children}</h1>,
                    h2: ({children}) => <h2 className="text-3xl font-light">{children}</h2>,
                    h3: ({children}) => <h3 className="text-2xl font-light">{children}</h3>,
                  }
                }}
              />
            </div>
          </div>

          {/* Project Photos */}
          {project.photos && project.photos.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.photos.map((photo, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                    <Image 
                      src={photo.asset.url} 
                      alt={photo.alt || `Project image ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Link */}
          {project.link && (
            <div className="mt-8 text-center">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
              >
                View Project
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
