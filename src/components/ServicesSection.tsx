"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiFirebase,
  SiSupabase,
  SiGo,
  SiPhp,
  SiFlutter,
  SiRedis,
  SiTailwindcss,
  SiPython,
  SiExpo,
  SiPrisma,
  SiStripe,
  SiVercel,
  SiDart,
  SiJavascript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  Code,
  Smartphone,
  Server,
  Cloud,
  ArrowUpRight,
  Users,
  CheckCircle,
} from "lucide-react";
import { Service } from "@/types";

const ServicesSection = () => {
  const services: Service[] = [
    {
      id: "web-development",
      title: "Web Development",
      description:
        "We create modern, responsive websites that deliver exceptional user experiences and drive business growth.",
      icon: "Code",
      features: [
        "React & Next.js Applications",
        "Responsive Design",
        "SEO Optimization",
        "Performance Optimization",
        "E-commerce Solutions",
        "CMS Integration",
      ],
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      description:
        "Cross-platform mobile applications that work seamlessly on iOS and Android devices.",
      icon: "Smartphone",
      features: [
        "React Native Development",
        "iOS & Android Apps",
        "Cross-platform Solutions",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
      ],
    },
    {
      id: "backend-development",
      title: "Backend Development",
      description:
        "Robust server-side solutions and APIs that power your applications with scalability and security.",
      icon: "Server",
      features: [
        "Node.js & Express APIs",
        "Database Design",
        "Cloud Infrastructure",
        "Authentication Systems",
        "Real-time Features",
        "Microservices Architecture",
      ],
    },
  ];

  const techRow1 = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "React Native", icon: SiReact, color: "#61DAFB" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "AWS", icon: FaAws, color: "#FF9900" },
  ];

  const techRow2 = [
    { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { name: "Dart", icon: SiDart, color: "#0175C2" },
    { name: "Go", icon: SiGo, color: "#00ADD8" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Redis", icon: SiRedis, color: "#DC382D" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    { name: "Stripe", icon: SiStripe, color: "#635BFF" },
    { name: "Expo", icon: SiExpo, color: "#ffffff" },
    { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Code,
      Smartphone,
      Server,
    };
    return icons[iconName as keyof typeof icons] || Code;
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end"
        >
          <motion.div variants={itemVariants}>
            <span className="section-label mb-4">Services</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight text-white mb-5">
              What We <span className="gradient-text">Build</span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/60 max-w-md lg:justify-self-end"
          >
            From concept to deployment, we provide end-to-end development
            services that transform your ideas into powerful digital solutions.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20"
        >
          {services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="card p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl glass border border-white/20">
                    <IconComponent className="h-6 w-6 text-indigo-400" />
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-white/65 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-white/75 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="pill pill-dark px-5 py-2.5 text-sm"
                  >
                    Start Your Brand Journey
                  </motion.a>
                  <motion.a
                    href="#contact"
                    aria-label={`Start a ${service.title} project`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="arrow-circle"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Technologies We Master — full-width marquee */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(70,118,194,0.08) 0%, rgba(89,195,104,0.05) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        className="py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <span className="section-label mb-4">Stack</span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We stay at the forefront of technology to deliver cutting-edge solutions
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden mb-6">
          <div
            className="flex gap-6 w-max"
            style={{ animation: "marquee 40s linear infinite", willChange: "transform" }}
          >
            {[...techRow1, ...techRow1].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 card px-8 py-5 rounded-2xl whitespace-nowrap flex-shrink-0 cursor-default"
                >
                  <Icon style={{ color: tech.color, fontSize: "2rem" }} className="flex-shrink-0" />
                  <span className="text-white font-semibold text-lg">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 w-max"
            style={{ animation: "marquee-reverse 40s linear infinite", willChange: "transform" }}
          >
            {[...techRow2, ...techRow2].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 card px-8 py-5 rounded-2xl whitespace-nowrap flex-shrink-0 cursor-default"
                >
                  <Icon style={{ color: tech.color, fontSize: "2rem" }} className="flex-shrink-0" />
                  <span className="text-white font-semibold text-lg">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Process Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="section-label mb-4">Process</span>
            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
              How We <span className="gradient-text">Work</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We understand your vision, goals, and requirements through detailed consultation.",
                icon: Users,
              },
              {
                step: "02",
                title: "Design",
                description:
                  "We create wireframes, prototypes, and design systems that align with your brand.",
                icon: Code,
              },
              {
                step: "03",
                title: "Development",
                description:
                  "We build your solution using best practices and modern development methodologies.",
                icon: Server,
              },
              {
                step: "04",
                title: "Deployment",
                description:
                  "We deploy your solution and provide ongoing support and maintenance.",
                icon: Cloud,
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                variants={itemVariants}
                className="relative"
              >
                <div className="card p-6 h-full">
                  <div className="text-4xl font-heading font-extrabold gradient-text mb-4 font-numeric">
                    {process.step}
                  </div>
                  <process.icon className="h-10 w-10 text-[#4676c2] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-3 text-center">
                    {process.title}
                  </h4>
                  <p className="text-white/65 text-center">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#4676c2] to-[#59c368] transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
