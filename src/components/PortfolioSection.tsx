"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import NextImage from "next/image";
import { useState } from "react";
import {
  FaCode,
  FaMobileAlt,
  FaFilter,
  FaGooglePlay,
  FaApple,
  FaGlobe,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Project } from "@/types";

const isExternalUrl = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://");

const ProjectCard = ({
  project,
  variants,
  featured = false,
}: {
  project: Project;
  variants: Variants;
  featured?: boolean;
}) => {
  const [imgError, setImgError] = useState(false);

  const hasImage =
    project.image && project.image !== "/api/placeholder/600/400" && !imgError;

  const categoryMeta: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    web: {
      label: "Web App",
      color: "text-[#4676C2] border-[#4676C2]/40 bg-[#4676C2]/10",
      icon: <FaGlobe className="h-3.5 w-3.5" />,
    },
    mobile: {
      label: "Mobile App",
      color: "text-[#59C368] border-[#59C368]/40 bg-[#59C368]/10",
      icon: <FaMobileAlt className="h-3.5 w-3.5" />,
    },
  };

  const meta = categoryMeta[project.category] ?? categoryMeta.web;

  const gradients: Record<string, string> = {
    web: "from-[#4676C2]/30 to-[#59C368]/20",
    mobile: "from-[#59C368]/30 to-[#4676C2]/20",
  };

  const placeholderIcons: Record<string, React.ReactNode> = {
    web: (
      <FaCode
        className="text-white/20"
        style={{ fontSize: featured ? "5rem" : "3.5rem" }}
      />
    ),
    mobile: (
      <FaMobileAlt
        className="text-white/20"
        style={{ fontSize: featured ? "5rem" : "3.5rem" }}
      />
    ),
  };

  const imgHeight = featured ? "h-72 md:h-96" : "h-52";

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -6 }}
      className="group card rounded-3xl overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className={`relative ${imgHeight} overflow-hidden flex-shrink-0`}>
        {hasImage && !isExternalUrl(project.image!) ? (
          <>
            <NextImage
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </>
        ) : hasImage && isExternalUrl(project.image!) ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image!}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradients[project.category] ?? gradients.web} flex items-center justify-center`}
          >
            {placeholderIcons[project.category] ?? placeholderIcons.web}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${meta.color}`}
          >
            {meta.icon}
            {meta.label}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live project: ${project.title}`}
                className="glass-strong p-3 rounded-full border border-white/30 hover:border-white/60 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="h-5 w-5 text-white" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className={`font-heading font-bold text-white mb-2 ${featured ? "text-2xl" : "text-xl"}`}
        >
          {project.title}
        </h3>
        <p className="text-white/65 leading-relaxed mb-5 flex-1 text-sm">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-white/70 border border-white/10 bg-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-white border border-[#4676c2]/30 bg-[#4676c2]/5 hover:bg-[#4676c2]/10 hover:border-[#4676c2] transition-all duration-200"
            >
              {project.category === "mobile" ? (
                <>
                  <FaGooglePlay className="h-4 w-4" />
                  <span>Play Store</span>
                </>
              ) : (
                <>
                  <FaGlobe className="h-4 w-4" />
                  <span>View Live</span>
                </>
              )}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm text-white border border-[#59c368]/40 bg-[#59c368]/5 hover:bg-[#59c368]/15 hover:border-[#59c368] transition-all duration-200"
            >
              <FaApple className="h-4 w-4" />
              <span>App Store</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    // ── Web projects ──
    {
      id: "space4climate",
      title: "Space4Climate",
      description:
        "Fun, online educational experience for schoolkids globally about space and climate change, combining film-making and social media.",
      image: "/projects/space4climate.png",
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      category: "web",
      liveUrl: "https://space4climate.vercel.app",
    },

    {
      id: "masifa",
      title: "Masifa Group",
      description:
        "OFSTED-registered children's homes website for a specialist SEMH/EBD care provider, including referrals, activities, and careers sections.",
      image: "/projects/masifa.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "web",
      liveUrl: "https://masifa.vercel.app",
    },
    {
      id: "queensgate",
      title: "Queensgate International School",
      description:
        "Full-featured school website for an Ontario-certified online international school, including admissions, academics, and a multi-step application flow.",
      image: "/projects/queensgate.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "web",
      liveUrl: "https://queensgate.vercel.app",
    },
    {
      id: "nextgenfighthub",
      title: "Next Gen Fight Hub",
      description:
        "Gym website for a Muay Thai, Boxing & MMA training facility in Basildon, Essex — featuring schedules, membership tiers, and a community hub.",
      image: "/projects/nextgenfighthub.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "web",
      liveUrl: "https://nextgenfighthub.vercel.app",
    },

    {
      id: "mashongatea",
      title: "Mashongatea Website",
      description:
        "Professional business website showcasing services and portfolio with modern design, responsive layout, and optimized performance.",
      image: "/projects/mashongatea.png",
      technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      category: "web",
      liveUrl: "https://www.mashongatea.com",
    },
    {
      id: "actualisationproject",
      title: "The Actualisation Project",
      description:
        "Coaching and mentorship platform focused on truth, connection, and real change — featuring assessments, programmes, and 1:1 coaching.",
      image: "/projects/actualisationproject.jpg",
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      category: "web",
      liveUrl: "https://theactualisationproject.vercel.app",
    },
    {
      id: "hope4nxtgen",
      title: "Hope for the Next Generation",
      description:
        "Non-profit platform harnessing sport, education, and community to build confident, resilient leaders across Mbale City, Uganda — highlighting impact, programme areas, and SDG commitments.",
      image: "/projects/hope4nxtgen.png",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      category: "web",
      liveUrl: "https://hope4nxtgen.org",
    },

    // ── Mobile projects ──
    {
      id: "cafe-jafn",
      title: "Cafe Jaf'n — Food Ordering",
      description:
        "Modern cafe ordering app with menu management, online payments, and delivery tracking for a seamless dining experience.",
      image: "/projects/cafe-jafn.jpg",
      technologies: [
        "React Native",
        "Firebase",
        "Stripe",
        "Node.js",
        "MongoDB",
      ],
      category: "mobile",
      githubUrl: "https://apps.apple.com/ug/app/cafe-jafn/id6746074084",
    },
    {
      id: "glam-n-go",
      title: "Glam n' Go — E-commerce App",
      description:
        "Cross-platform shopping app for women, men, and kids with secure payments, real-time delivery tracking, and a seamless user experience.",
      image: "/projects/glam-n-go.jpg",
      technologies: [
        "React Native",
        "Firebase",
        "Stripe",
        "Node.js",
        "MongoDB",
      ],
      category: "mobile",
      liveUrl:
        "https://play.google.com/store/apps/details?id=com.kenyana.glamngo",
      githubUrl: "https://apps.apple.com/ug/app/glam-n-go/id6503872122",
    },
    {
      id: "tuwe-app",
      title: "Tuwe — Community Management",
      description:
        "Revolutionary community management platform for Ugandan neighborhoods with fee collections, property listings, and local services.",
      image: "/projects/tuwe.jpg",
      technologies: [
        "React Native",
        "Node.js",
        "PostgreSQL",
        "Mobile Money",
        "USSD",
      ],
      category: "mobile",
      liveUrl:
        "https://play.google.com/store/apps/details?id=com.emmanuellubwama.tuwe",
      githubUrl: "https://apps.apple.com/ug/app/tuwe/id6752911597",
    },
    {
      id: "easy-gas",
      title: "Easy Gas — Delivery App",
      description:
        "Convenient cooking gas delivery app with seamless ordering, real-time tracking, and reliable service across Uganda.",
      image: "/projects/easy-gas.jpg",
      technologies: [
        "React Native",
        "Firebase",
        "Google Maps",
        "Node.js",
        "MongoDB",
      ],
      category: "mobile",
      liveUrl:
        "https://play.google.com/store/apps/details?id=com.easygas.mobile.app",
      githubUrl: "https://apps.apple.com/ug/app/easy-gas/id6738344020",
    },
  ];

  const filters = [
    {
      id: "all",
      label: "All Projects",
      icon: <FaFilter className="h-3.5 w-3.5" />,
    },
    { id: "web", label: "Web Apps", icon: <FaCode className="h-3.5 w-3.5" /> },
    {
      id: "mobile",
      label: "Mobile Apps",
      icon: <FaMobileAlt className="h-3.5 w-3.5" />,
    },
  ];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const INITIAL_COUNT = 3;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4">Portfolio</span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real products, real impact — from web platforms to mobile apps
            shipped to thousands of users.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setShowAll(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                activeFilter === f.id
                  ? "bg-[#4676c2] text-white border border-[#4676c2] shadow-lg shadow-[#4676c2]/25"
                  : "card text-white/70 border border-white/10 hover:border-white/25 hover:text-white"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More / View Less */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="pill pill-dark px-8 py-3.5 text-sm"
            >
              {showAll ? (
                <>
                  <FaChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <FaChevronDown className="h-4 w-4" />
                  View All Projects
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >
          <div
            className="rounded-3xl p-10 md:p-14 relative overflow-hidden section-deep"
          >
            <div className="relative z-10 text-center">
              <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Build Something{" "}
                <span className="gradient-text">Amazing?</span>
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Let&apos;s turn your idea into a product people love. We&apos;re
                ready when you are.
              </p>
              <a
                href="#contact"
                className="pill pill-light px-8 py-4 text-lg"
              >
                Start Your Project
                <FaExternalLinkAlt className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
