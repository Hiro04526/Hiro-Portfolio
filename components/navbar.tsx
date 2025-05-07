"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from 'next/image'

const navItems = [
  { name: "Home", path: "/#home" },
  { name: "About", path: "/#about" },
  { name: "Skills", path: "/#skills" },
  { name: "Projects", path: "/#projects" },
  { name: "Contact", path: "/#contact" },
]

export const useActiveHash = () => {
  const [activeHash, setActiveHash] = useState("#home")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("id")
          if (id) setActiveHash(`#${id}`)
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    )

    sections.forEach((section) => observer.observe(section))

    const onHashChange = () => {
      const id = window.location.hash.slice(1)
      if (document.getElementById(id)) {
        setActiveHash(`#${id}`)
      }
    }

    window.addEventListener("hashchange", onHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return activeHash
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const activeHash = useActiveHash()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <LayoutGroup>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
          <Link
            href="/#home"
            className="w-8 h-8 relative hover:opacity-80 transition-opacity"
          >
            <Image
              src="/assets/favicon.ico"
              alt="Logo"
              fill
              loading="lazy"
              quality={70}
              className="object-contain"
            />
          </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = item.path.endsWith(activeHash)

                return (
                  <div key={item.path} className="relative">
                    <Link
                      href={item.path}
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20,
          }}
          className={cn(
            "absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg md:hidden",
            !isMobileMenuOpen && "hidden"
          )}
        >
          <div className="container mx-auto px-4 py-4">
            {navItems.map((item) => {
              const isActive = item.path.endsWith(activeHash)

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </motion.div>
      </motion.nav>
    </LayoutGroup>
  )
}