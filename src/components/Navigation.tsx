"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10"
          : "bg-transparent"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        ...(scrolled && {
          backgroundColor: "rgba(15, 15, 35, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo — left */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            className="flex items-center flex-shrink-0"
          >
            <div className="relative h-12 w-40 overflow-hidden flex items-center">
              <Image
                src="/techvector.svg"
                alt="Lubech"
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </motion.a>

          {/* Desktop Navigation — absolutely centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-9">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium text-[15px] whitespace-nowrap"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Get Started — right */}
          <div className="hidden md:flex flex-shrink-0">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pill pill-dark px-6 py-2.5 text-sm"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-white flex items-center justify-center w-10 h-10 rounded-full border border-white/15 glass"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-5 py-5 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 8 }}
                  onClick={() => setIsOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(false)}
                className="block text-center w-full pill pill-dark px-6 py-3 text-sm"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
