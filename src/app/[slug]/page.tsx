import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';
import { Project } from '@/types/sanity';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await client.fetch<Project>(projectBySlugQuery, {
    slug: params.slug,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-xl font-medium hover:text-accent-blue transition-colors">
            Jake DCL
          </a>
          <div className="hidden md:flex space-x-6 text-sm">
            <a href="/projects" className="hover:text-accent-blue transition-colors">Projects</a>
            <a href="/about" className="hover:text-accent-blue transition-colors">About</a>
            <a href="/studio" className="hover:text-accent-blue transition-colors">Studio</a>
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
            <h1 className="text-4xl font-light mb-4">{project.title}</h1>
            <p className="text-lg text-gray-600">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {project.featuredImage && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={project.featuredImage.asset.url} 
                    alt={project.featuredImage.alt || project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {project.longDescription && (
                <div className="prose max-w-none">
                  {/* Rich text content will be rendered here */}
                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={image.asset.url} 
                        alt={image.alt || `${project.title} image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Project Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 capitalize">{project.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">Published:</span>
                    <span className="ml-2">{new Date(project.publishedAt).toLocaleDateString()}</span>
                  </div>
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <span className="font-medium">Technologies:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-white rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-accent-blue text-white text-center py-3 rounded-lg hover:bg-accent-blue/90 transition-colors"
                >
                  View Live Site
                </a>
              )}

              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
