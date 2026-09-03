"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Code,
  Briefcase,
  Users,
  Mail,
  ChevronUp,
  Star,
} from "lucide-react";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Services", href: "#services", icon: Code },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "About", href: "#about", icon: Users },
    { name: "Testimonials", href: "#testimonials", icon: Star },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-6 z-50"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
      }}
    >
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 glass-strong text-white px-4 py-3 rounded-full border border-white/15 hover:border-white/30 transition-all duration-200 min-w-[140px] shadow-lg"
                >
                  <IconComponent className="h-5 w-5 text-[#4676c2]" />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button (when menu is closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="absolute bottom-16 right-0 glass-strong text-white p-3 rounded-full border border-white/15 transition-all duration-200 mb-3 shadow-lg"
          >
            <ChevronUp className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="glass-strong text-white p-4 rounded-full border border-white/15 transition-all duration-200 shadow-xl"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMenu;
