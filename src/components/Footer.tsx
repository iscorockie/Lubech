"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { name: "Web Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "Backend Systems", href: "#services" },
      { name: "UI/UX Design", href: "#services" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const contactItems = [
    {
      icon: FaEnvelope,
      label: "info@lubech.tech",
      href: "mailto:info@lubech.tech",
      color: "#4676C2",
    },
    {
      icon: FaPhone,
      label: "+44 7572 964620",
      href: "tel:+447572964620",
      color: "#59C368",
    },
    {
      icon: FaMapMarkerAlt,
      label: "28 Foxwell Square NN35AT Northampton",
      href: "https://maps.google.com/?q=28 Foxwell Square NN35AT Northampton",
      color: "#f59e0b",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp Us",
      href: "https://wa.me/447572964620",
      color: "#25D366",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://linkedin.com/company/lubech",
      color: "#0A66C2",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/447572964620",
      color: "#25D366",
    },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-[#0d1030] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative z-10">
        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <a href="#home" className="inline-block mb-6">
              <div className="relative h-20 w-56 overflow-hidden flex items-center">
                <Image
                  src="/techvector.svg"
                  alt="Lubech"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </a>

            <p className="text-white/60 mb-7 leading-relaxed text-sm max-w-sm">
              We are a passionate team of developers, designers, and innovators
              dedicated to transforming your ideas into digital reality — from
              web apps to mobile and backend systems.
            </p>

            <div className="space-y-3 max-w-sm">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(89,195,104,0.45)]"
                    style={{ background: `linear-gradient(135deg, ${item.color}55, ${item.color}20)`, color: item.color }}
                  >
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors duration-200 font-numeric">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold mb-5 text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold mb-5 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-white/10 pt-7 pb-4 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p variants={itemVariants} className="text-white/45 text-sm">
            © <span className="font-numeric">{new Date().getFullYear()}</span>{" "}
            Lubech. All rights reserved.
          </motion.p>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            {socialLinks.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 transition-all duration-200 hover:border-white/25 hover:shadow-[0_0_18px_rgba(70,118,194,0.5)]"
                style={{ background: `linear-gradient(135deg, ${s.color}55, ${s.color}1a)` }}
              >
                <s.icon className="h-5 w-5 text-white" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
          >
            Back to top
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/10">
              <FaArrowUp className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Giant faded watermark */}
      <div className="pointer-events-none select-none relative h-28 overflow-hidden opacity-[0.06]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-extrabold text-[26rem] leading-none tracking-tight whitespace-nowrap">
            LUBECH
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
