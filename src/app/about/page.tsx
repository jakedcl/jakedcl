import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/about" className="text-accent-blue">About</Link>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light mb-4">
              <span className="text-gradient">About</span>
            </h1>
            <p className="text-xl text-gray-600">
              Creative developer, digital sampler, boundary pusher.
            </p>
          </div>

          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-light mb-4 text-accent-blue">Approach</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I focus on creating clean, functional websites that prioritize user experience 
                  and modern design principles. My work combines technical expertise with 
                  thoughtful design to deliver solutions that are both beautiful and practical.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I believe in the power of good design to enhance functionality, creating 
                  digital experiences that are intuitive, accessible, and engaging for users.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light mb-4 text-accent-green">Background</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I'm a web developer with a focus on frontend experiences. My journey 
                  started with React and I've evolved to embrace Next.js for its powerful 
                  full-stack capabilities. I use Tailwind CSS for its utility-first approach 
                  that enables rapid development and clean, maintainable code.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I enjoy working on diverse projects that challenge me to learn new 
                  technologies and approaches, always striving to deliver the best possible 
                  user experience.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light mb-4 text-accent-red">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Frontend</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Next.js & React</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Framer Motion</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Tools & Platforms</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Sanity CMS</li>
                      <li>Vercel</li>
                      <li>Git & GitHub</li>
                      <li>Figma</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile placeholder */}
              <div className="bg-gradient-to-br from-accent-blue/20 to-accent-red/20 h-80 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/50 rounded-full mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Profile photo</p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-sm text-gray-600">Based in [Your Location]</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Currently</h3>
                  <p className="text-sm text-gray-600">Building creative web experiences</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Web Design', 'UI/UX', 'Photography', 'Typography', 'Modern Tech'].map((interest) => (
                      <span key={interest} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-3">
                <a 
                  href="https://github.com/jakedcl" 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-gray-900 rounded"></div>
                  <span className="text-sm">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/jakedcl" 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a 
                  href="mailto:jakedcl73@gmail.com" 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-16 border-t border-gray-200">
            <h2 className="text-2xl font-light mb-4">Let's create something together</h2>
            <p className="text-gray-600 mb-8">
              I'm always interested in new projects and collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/projects"
                className="inline-block px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View my work
              </Link>
              <Link 
                href="mailto:jakedcl73@gmail.com"
                className="inline-block px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
