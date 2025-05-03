'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GlobalStyles } from '@mui/material'
import { siReact, siCss3, siJavascript, siTypescript, siPython } from 'simple-icons/icons'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const scrollbarStyles = (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': { width: '8px' },
      '*::-webkit-scrollbar-track': { background: 'transparent' },
      '*::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '20px'
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(255, 255, 255, 0.7)'
      }
    }}
  />
)

const SimpleIcon = ({ icon, className = '' }: { icon: any; className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 fill-current ${className}`}
  >
    <title>{icon.title}</title>
    <path d={icon.path} />
  </svg>
)

interface Skill {
  name: string
  level: number
  icon: any
  description: string
}

export function SkillSection() {
  const [showLevel, setShowLevel] = useState<boolean>(false)

  const skills: Skill[] = [
    {
      name: 'React',
      level: 90,
      icon: siReact,
      description: 'Building interactive UIs with React'
    },
    {
      name: 'CSS',
      level: 80,
      icon: siCss3,
      description: 'Styling web applications with CSS'
    },
    {
      name: 'JavaScript',
      level: 95,
      icon: siJavascript,
      description: 'Language for web development'
    },
    {
      name: 'TypeScript',
      level: 90,
      icon: siTypescript,
      description: 'Typed superset of JavaScript'
    },
    {
      name: 'Python',
      level: 70,
      icon: siPython,
      description: 'Versatile programming language'
    }
  ]

  return (
    <>
      {scrollbarStyles}
      <section id="skills" className="py-12 bg-gradient-to-br from-background to-secondary overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mt-2 mx-auto px-4"
        >
          <div className="text-center mb-6">
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-primary"
            >
              My Skills
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Here's a collection of my skills with their proficiency levels.
            </motion.p>
            <Button
              onClick={() => setShowLevel(!showLevel)}
              className="transition-colors duration-300 hover:bg-purple-600"
            >
              {showLevel ? 'Hide Levels' : 'Show Levels'}
            </Button>
          </div>

          <Carousel className="relative" opts={{ loop: true }}>
            <CarouselPrevious />
            <CarouselContent>
              {skills.map((skill, index) => (
                <CarouselItem key={skill.name} className="px-2 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100,
                        damping: 10
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      transition: { duration: 0.3 }
                    }}
                    className="relative overflow-hidden rounded-lg shadow-xl p-6"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(index * 50) % 360}, 70%, 50%), hsl(${
                        (index * 50 + 180) % 360
                      }, 70%, 50%))`
                    }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <SimpleIcon icon={skill.icon} className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{skill.name}</h3>
                    <p className={`text-white ${!showLevel ? '' : 'mb-4'}`}>{skill.description}</p> 
                    {showLevel && (
                      <div className="w-full bg-white/30 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className="bg-primary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    )}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </motion.div>
      </section>
    </>
  )
}
