"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  Target,
  Award,
  Heart,
  Linkedin,
  Twitter,
  Github,
  Code,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TeamMember } from "@/types";
import AnimatedCounter from "./AnimatedCounter";

const AboutSection = () => {
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: "lubega",
      name: "Lubega Faizal",
      role: "CEO",
      image: "/staff/lubega.jpeg",
      bio: "Chief Executive Officer dedicated to building exceptional digital experiences. Focused on driving innovation and delivering solutions that make a meaningful impact on businesses and communities.",
      social: {
        linkedin: "https://linkedin.com/in/lubega-faizal",
      },
    },
    {
      id: "emmanuel",
      name: "Lubwama Emmanuel",
      role: "Co-Founder & CTO",
      image: "/staff/emmanuel.jpg",
      bio: "Full-stack developer with 5+ years of experience building scalable web and mobile applications. Passionate about creating innovative solutions that drive business growth and transform ideas into digital reality.",
      social: {
        linkedin: "https://www.linkedin.com/in/lubwama-emmanuel-b35377226/",
        github: "https://github.com/Lubwama-Emmanuel",
      },
    },

    {
      id: "solomon",
      name: "Solomon Kyagulanyi",
      role: "Software Engineer",
      image: "/staff/solomon.jpeg",
      bio: "Software engineer on the Lubech tech team, comfortable across Linux, Python, Java, SQL, and Git, with additional strength in R and Julia for data and analytical work.",
      social: {},
    },
    {
      id: "dembe",
      name: "Dembe Oscar",
      role: "AI/ML Engineer",
      image: "/staff/oscar.jpeg",
      bio: "AI/ML Engineer on the Lubech tech team, comfortable across Linux, Python, Java, SQL, and Git, with additional strength in R and Julia for data and analytical work.",
      social: {
        linkedin: "https://www.linkedin.com/in/oscardembe/",
      },
    },
    {
      id: "anncarl",
      name: "Anncarl Mwendwa",
      role: "Software Engineer",
      image: "/staff/anncarl.jpeg",
      bio: "Software Engineer on the Lubech tech team, comfortable across Linux, Python, Java, SQL, and Git, with additional strength in R and Julia for data and analytical work.",
      social: {
        linkedin: "https://www.linkedin.com/in/anncarl-mwendwa/"
      },
    },
    {
      id: "isco",
      name: "Ronald Isiko",
      role: "UI/UX Designer",
      image: "/staff/isco.jpeg",
      bio: "UI / UX Visual alchemist | Photographer, video editor & graphic designer | NFT creator & Web3 explorer on Farcaster, Zeroone, Zora, Foundation & Rodeo.",
      social: {
        linkedin: "https://www.linkedin.com/in/isco-ronald-247865222/",
        github: "https://github.com/iscorockie",
      },
    },
  ];

  const maxIndex = Math.max(0, teamMembers.length - visibleCards);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description:
        "We never compromise on quality. Every line of code, every design element, and every user interaction is crafted with precision and care.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description:
        "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "We stay ahead of the curve by embracing new technologies and methodologies to deliver cutting-edge solutions.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love what we do, and it shows in our work. Our passion for technology drives us to create exceptional digital experiences.",
    },
  ];

  const stats = [
    { number: "30+", label: "Projects Delivered", icon: Code },
    { number: "100%", label: "Client Satisfaction", icon: Star },
    { number: "7+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Heart },
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
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Watermark */}
      <div className="pointer-events-none select-none absolute top-1/2 right-0 opacity-[0.07] translate-x-1/3 -translate-y-1/2">
        <div className="relative w-80 h-80 overflow-hidden">
          <Image
            src="/logo_icon.png"
            alt=""
            fill
            className="object-contain scale-[3] origin-center"
            aria-hidden
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6 border border-white/20"
          >
            <Users className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-white/90">About Us</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Meet the <span className="gradient-text">Team</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            We are a passionate team of developers, designers, and innovators
            dedicated to transforming your ideas into digital reality.
          </motion.p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-6">
              Our <span className="gradient-text">Story</span>
            </h3>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Founded in 2021, Lubech started as a passionate team of
                developers with a mission to create exceptional digital
                experiences that transform businesses and communities across the
                UK and beyond.
              </p>
              <p>
                Over the years, we&apos;ve successfully delivered over 30
                projects including web platforms like Labour Experts and
                Ordnancity, and mobile applications like Glam n&apos; Go, Tuwe,
                and Easy Gas. Our work spans from e-commerce solutions to
                community management platforms, helping businesses and
                communities embrace digital transformation.
              </p>
              <p>
                Today, we continue to push the boundaries of what&apos;s
                possible in web and mobile development, always staying ahead of
                the latest technologies and trends while maintaining our
                commitment to quality and client satisfaction.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 border border-white/20 text-center"
                >
                  <IconComponent className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-2">
                    <AnimatedCounter value={stat.number} />
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Our <span className="gradient-text">Team</span>
          </motion.h3>

          <div
            className="relative max-w-7xl mx-auto px-4 sm:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Viewport Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
                }}
              >
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="glass rounded-2xl p-8 border border-white/20 hover:glass-strong hover:border-white/30 transition-all duration-300 text-center h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <div className="absolute inset-0 glass rounded-full border-2 border-white/20 overflow-hidden">
                            {member.image &&
                              member.image !== "/api/placeholder/300/300" ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    const fallback =
                                      parent.querySelector(".member-fallback");
                                    if (fallback) {
                                      (fallback as HTMLElement).style.display = "flex";
                                    }
                                  }
                                }}
                              />
                            ) : null}
                            <div
                              className="member-fallback absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-orange-500/20"
                              style={{
                                display:
                                  member.image &&
                                    member.image !== "/api/placeholder/300/300"
                                    ? "none"
                                    : "flex",
                              }}
                            >
                              <Users className="h-12 w-12 text-white/60" />
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2">
                          {member.name}
                        </h4>

                        <p className="text-indigo-400 font-semibold mb-4">
                          {member.role}
                        </p>

                        <p className="text-white/80 mb-6 leading-relaxed text-sm">
                          {member.bio}
                        </p>
                      </div>

                      <div className="flex justify-center space-x-4 mt-auto">
                        {member.social.linkedin && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 glass text-indigo-400 rounded-full border border-white/20 hover:glass-strong hover:border-white/30 transition-all duration-200"
                          >
                            <Linkedin className="h-5 w-5" />
                          </motion.a>
                        )}
                        {member.social.twitter && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 glass text-indigo-400 rounded-full border border-white/20 hover:glass-strong hover:border-white/30 transition-all duration-200"
                          >
                            <Twitter className="h-5 w-5" />
                          </motion.a>
                        )}
                        {member.social.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 glass text-white/80 rounded-full border border-white/20 hover:glass-strong hover:border-white/30 transition-all duration-200"
                          >
                            <Github className="h-5 w-5" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {maxIndex > 0 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 p-3 rounded-full glass border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all focus:outline-none cursor-pointer"
                  aria-label="Previous team member"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 p-3 rounded-full glass border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all focus:outline-none cursor-pointer"
                  aria-label="Next team member"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Pagination Dots */}
            {maxIndex > 0 && (
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${currentIndex === index
                        ? "w-8 bg-indigo-500"
                        : "w-2 bg-white/25 hover:bg-white/40"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Our <span className="gradient-text">Values</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 border border-white/20 hover:glass-strong hover:border-white/30 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 glass rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <value.icon className="h-8 w-8 text-indigo-400" />
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h4>

                <p className="text-white/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 glass-strong rounded-3xl p-8 md:p-12 border border-white/20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">Lubech</span>?
            </h3>
            <p className="text-white/80 text-lg">
              We combine technical expertise with creative vision to deliver
              exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Full-stack development expertise",
              "Modern technology stack",
              "Agile development methodology",
              "24/7 support and maintenance",
              "Scalable and secure solutions",
              "Competitive pricing and timelines",
            ].map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-white/90 font-medium">{reason}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
