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
  ArrowRight,
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

  const processSteps = [
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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
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
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(70,118,194,0.6), rgba(89,195,104,0.35) 55%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end"
        >
          <motion.div variants={itemVariants}>
            <span className="section-label mb-4">Services</span>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">
              What We <span className="gradient-text">Build</span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-lg text-white/60 lg:justify-self-end"
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
          className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/25"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Hover gradient wash */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(70,118,194,0.18), rgba(89,195,104,0.14))",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 transition-all duration-300 group-hover:scale-105 group-hover:border-white/25"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(70,118,194,0.35), rgba(89,195,104,0.28))",
                      boxShadow:
                        "0 8px 24px rgba(70,118,194,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <span className="font-numeric text-5xl font-extrabold leading-none text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 font-heading text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="relative mt-3 text-sm leading-relaxed text-white/65">
                  {service.description}
                </p>

                <ul className="relative mt-6 space-y-2.5">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm text-white/75"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto flex items-center justify-between pt-6">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="pill pill-dark px-5 py-2.5 text-sm"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
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
        className="relative py-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(70,118,194,0.08) 0%, rgba(89,195,104,0.05) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 px-4 text-center"
        >
          <span className="section-label mb-4">Stack</span>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            We stay at the forefront of technology to deliver cutting-edge
            solutions
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <div className="mb-6 overflow-hidden">
          <div
            className="flex w-max gap-5"
            style={{ animation: "marquee 40s linear infinite", willChange: "transform" }}
          >
            {[...techRow1, ...techRow1].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  className="flex shrink-0 cursor-default items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-5 backdrop-blur-xl whitespace-nowrap transition-colors duration-200 hover:border-white/25"
                >
                  <Icon
                    style={{ color: tech.color, fontSize: "2rem" }}
                    className="shrink-0"
                  />
                  <span className="text-lg font-semibold text-white">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-5"
            style={{ animation: "marquee-reverse 40s linear infinite", willChange: "transform" }}
          >
            {[...techRow2, ...techRow2].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  className="flex shrink-0 cursor-default items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-7 py-5 backdrop-blur-xl whitespace-nowrap transition-colors duration-200 hover:border-white/25"
                >
                  <Icon
                    style={{ color: tech.color, fontSize: "2rem" }}
                    className="shrink-0"
                  />
                  <span className="text-lg font-semibold text-white">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24"
        >
          <div className="mb-14 text-center">
            <span className="section-label mb-4">Process</span>
            <h3 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
              How We <span className="gradient-text">Work</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              A proven, transparent process that takes you from idea to launch.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {processSteps.map((process) => (
              <motion.div key={process.step} variants={itemVariants} className="relative">
                <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-numeric text-4xl font-extrabold gradient-text">
                      {process.step}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08]">
                      <process.icon className="h-5 w-5 text-[#4676c2]" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white">{process.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
