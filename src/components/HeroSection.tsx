"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code, Smartphone, Server, Sparkles } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.16, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 26, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  };

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android",
    },
    {
      icon: Server,
      title: "Backend Systems",
      description: "Scalable APIs and server infrastructure for your applications",
    },
  ];

  const stats = [
    { number: "30+", label: "Projects Delivered" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "7+", label: "Years Experience" },
  ];

  return (
    <section id="home" className="hero-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start"
        >
          {/* Left — heading + CTA */}
          <div className="lg:col-span-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-7 border border-white/20"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide text-white/90">
                Professional Development Services
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-7"
            >
              Unleashing The
              <br />
              Potential Of Your{" "}
              <span className="gradient-text">Brand</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-9"
            >
              We build stunning websites, cross-platform mobile applications,
              and robust backend systems that drive your business forward.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="pill pill-dark px-8 py-4 text-base"
              >
                Start Your Brand Journey
                <ArrowRight className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="pill pill-light px-8 py-4 text-base"
              >
                View Our Work
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-white">
                  <div className="font-numeric text-3xl md:text-4xl font-bold gradient-text">
                    <AnimatedCounter value={stat.number} />
                  </div>
                  <div className="text-white/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — service cards */}
          <div className="lg:col-span-6 space-y-5">
            {/* Featured glass card */}
            <motion.div
              variants={itemVariants}
              className="card p-8"
            >
              <span className="section-label mb-3">Featured Service</span>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                Full-stack Product Development
              </h3>
              <p className="text-white/70 leading-relaxed">
                We combine strategy, design, and engineering to ship products
                people love — from the first wireframe to production deployment
                and beyond.
              </p>
              <div className="flex items-center justify-between mt-6">
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pill pill-dark px-6 py-3 text-sm"
                >
                  Explore Services
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="#contact"
                  aria-label="Start a project"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="arrow-circle"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Secondary tinted cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="card-tint p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="h-8 w-8 text-white" />
                    <motion.a
                      href="#services"
                      aria-label={`Learn about ${service.title}`}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.9 }}
                      className="arrow-circle arrow-circle-light w-9 h-9"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                  <h3 className="card-title font-heading text-lg font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
