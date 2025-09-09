import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-medium hover:text-accent-blue transition-colors">
            Jake DCL
          </Link>
          <div className="hidden md:flex space-x-6 text-sm">
            <Link href="/projects" className="text-accent-blue">Projects</Link>
            <Link href="/about" className="hover:text-accent-blue transition-colors">About</Link>
            <Link href="/studio" className="hover:text-accent-blue transition-colors">Studio</Link>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link 
            href="mailto:jakedcl73@gmail.com" 
            className="text-sm hover:text-accent-blue transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light mb-4">
              <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              A collection of websites and applications showcasing modern web development 
              and design principles.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-8 mb-12 border-b border-gray-200">
            {['All', 'Websites', 'Design', 'Applications'].map((tab) => (
              <button
                key={tab}
                className={`pb-4 text-sm font-medium transition-colors ${
                  tab === 'All' 
                    ? 'border-b-2 border-accent-blue text-accent-blue' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Placeholder projects - will be populated by Sanity */}
            {[
              {
                title: "Drew Della Search Engine",
                category: "Web Design",
                description: "A playful parody of Google's interface with custom branding and personality.",
                color: "bg-accent-blue",
                featured: true
              },
              {
                title: "MetroTapes",
                category: "Brand Identity",
                description: "Hip-hop inspired design system using real MetroCard imagery and NYC aesthetics.",
                color: "bg-accent-red",
                featured: true
              },
              {
                title: "Truck Market Interface",
                category: "UI/UX Design",
                description: "Bold automotive marketplace with strong typography and industrial feel.",
                color: "bg-accent-yellow",
                featured: false
              },
              {
                title: "Concrete Babies Film",
                category: "Video/Film",
                description: "Short film project with accompanying digital presence and promotional materials.",
                color: "bg-accent-green",
                featured: false
              },
              {
                title: "Photography Series",
                category: "Photography",
                description: "Collection of urban and portrait photography exploring themes of identity.",
                color: "bg-gray-500",
                featured: false
              },
              {
                title: "Woodworking Projects",
                category: "Physical",
                description: "Handcrafted furniture and objects blending traditional techniques with modern design.",
                color: "bg-amber-600",
                featured: false
              }
            ].map((project, index) => (
              <div 
                key={index}
                className={`group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className={`h-64 ${project.color}/20 relative overflow-hidden`}>
                  <div className={`absolute inset-0 ${project.color}/10 group-hover:${project.color}/20 transition-colors`}></div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <button className="text-accent-blue hover:text-accent-blue/80 text-sm font-medium transition-colors">
                    View Project →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center py-16 border-t border-gray-200">
            <h2 className="text-2xl font-light mb-4">Want to collaborate?</h2>
            <p className="text-gray-600 mb-8">
              I'm always interested in working on creative projects that push boundaries.
            </p>
            <Link 
              href="mailto:jakedcl73@gmail.com"
              className="inline-block px-8 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
