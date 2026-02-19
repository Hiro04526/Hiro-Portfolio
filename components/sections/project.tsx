"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FaChevronRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { FaFigma } from "react-icons/fa6"

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
  textColor: string;
  details: string;
  technologies: string[];
  github: string;
  figma: string;
  live: string;
};

const projectData: Project[] = [
  {
    id: 1,
    title: 'Green Giant FM Website',
    description: 'Modernized web presence for Green Giant FM.',
    image: '/assets/green-giant.png',
    color: 'from-emerald-500 to-emerald-700',
    textColor: 'text-white', 
    details: 'Redesigned and modernized the organization`s website to improve mobile responsiveness, implement new features and pages, and elevate overall brand presentation. Note: Work In Progress',
    technologies: ['Next.js', 'Typescript', 'Supabase', 'Google OAuth', 'Spotify API'],
    github: '',
    figma: '',
    live: 'https://greengiantfm.netlify.app',
  },
  {
    id: 2,
    title: 'Ultimate Minecraft Forum',
    description: 'A modernized community platform for Minecraft enthusiasts.',
    image: '/assets/minecraft.png',
    color: 'from-zinc-500 to-zinc-700',
    textColor: 'text-white',
    details: 'Originally developed as a major academic project, I migrated and re-engineered the platform from a legacy HTML/JS/MongoDB stack to a high-performance Next.js framework. This overhaul integrated Supabase for streamlined data management and focused on optimizing user interaction and overall site scalability.',
    technologies: ['Next.js', 'Typescript', 'Supabase', 'Tailwind CSS'],
    github: '',
    figma: '',
    live: 'https://mc-forum.vercel.app/',
  }
];

export function ProjectSection() {
  // Define selectedProject state to accept Project type or null
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(projectData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="projects" className="bg-gradient-to-br from-background to-secondary/30 transition-colors duration-300 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen flex flex-col items-center justify-center"
      >
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-secondary/20 to-background animate-pulse" />
        </div>

        <div className="container mx-auto px-4 mb-6 z-10">
          <div className="text-center mb-4">
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mt-4 mb-4 pb-2 bg-clip-text text-primary"
            >
              Featured Projects
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Explore a collection of innovative projects that showcase my expertise in cutting-edge web technologies and creative problem-solving.
            </motion.p>
          </div>

          {/* Project Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`bg-gradient-to-br ${project.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-fit rounded-t-lg mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                />
                <motion.h3
                  className={`text-2xl font-semibold mt-4 ${project.textColor}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className={`mt-2 ${project.textColor} opacity-90`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="mt-4"
                >
                  <Button 
                    size="lg" 
                    className={`group bg-white/20 hover:bg-white/30 ${project.textColor}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                    <FaChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <div className="text-sm text-muted-foreground">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-fit object-cover rounded-lg mb-4"
                  />
                  <p className="mb-4">{selectedProject.details}</p>
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Button className="group bg-gray-800 text-white hover:bg-gray-700">
                          <FaGithub className="mr-2" />
                          GitHub
                        </Button>
                      </a>
                    )}
                    {selectedProject.figma && (
                      <a href={selectedProject.figma} target="_blank" rel="noopener noreferrer">
                        <Button className="group bg-pink-600 text-white hover:bg-pink-500">
                          <FaFigma className="mr-2" />
                          Figma
                        </Button>
                      </a>
                    )}
                    {selectedProject.live && (
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                        <Button className="group bg-blue-600 text-white hover:bg-blue-500">
                          <FaExternalLinkAlt className="mr-2" />
                          Live
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
