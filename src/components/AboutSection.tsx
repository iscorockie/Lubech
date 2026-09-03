"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Heart,
  Linkedin,
  Github,
  Youtube,
  CheckCircle,
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
      image: "/staff/lubega.jpg",
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
        linkedin: "https://www.linkedin.com/in/anncarl-mwendwa/",
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
    {
      id: "daniel",
      name: "Web Daniel Sebakijje",
      role: "Tech Consultant & Sports Journalist",
      image: "/staff/daniel.jpg",
      bio: "Tech Consultant and Sports Journalist on the Lubech team, bringing together technical consulting expertise with a passion for sports journalism to deliver insightful, data-driven content and analysis.",
      social: {
        youtube: "https://youtu.be/M0niLgG-QmA?si=8LDcTyDSG15DV45q",
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
    { number: "30+", label: "Projects Delivered" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "7+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="about" className="section-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="section-label mb-4">Team</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-white max-w-4xl mx-auto mb-6"
          >
            People Who Don&apos;t Follow Trends —{" "}
            <span className="gradient-text">They Create Them</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/65 max-w-2xl mx-auto"
          >
            We are a passionate team of developers, designers, and innovators
            dedicated to transforming your ideas into digital reality.
          </motion.p>
        </motion.div>

        {/* Story + Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-3xl font-bold text-white mb-6">
              Our <span className="gradient-text">Story</span>
            </h3>
            <div className="space-y-4 text-white/70 leading-relaxed">
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
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl p-6 bg-white/[0.06] border border-white/10 text-center"
              >
                <div className="font-numeric text-3xl md:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Team Members carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="font-heading text-3xl font-bold text-white text-center mb-12"
          >
            Our <span className="gradient-text">Team</span>
          </motion.h3>

          <div
            className="relative max-w-7xl mx-auto px-4 sm:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Viewport */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                }}
              >
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      className="group h-full flex flex-col"
                    >
                      <div className="relative rounded-3xl overflow-hidden border border-white/10">
                        <div className="relative h-80 md:h-96 w-full">
                          {member.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                t.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4676c2]/40 to-[#59c368]/30">
                              <Users className="h-16 w-16 text-white/60" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1030]/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h4 className="font-heading text-xl font-bold text-white">
                              {member.name}
                            </h4>
                            <p className="text-indigo-300 font-medium text-sm mt-1">
                              {member.role}
                            </p>
                          </div>
                        </div>

                        {/* Socials */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {member.social.linkedin && (
                            <motion.a
                              whileHover={{ scale: 1.15 }}
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 hover:bg-[#4676c2] hover:text-white transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                            </motion.a>
                          )}
                          {member.social.github && (
                            <motion.a
                              whileHover={{ scale: 1.15 }}
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on GitHub`}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 hover:bg-[#4676c2] hover:text-white transition-colors"
                            >
                              <Github className="h-4 w-4" />
                            </motion.a>
                          )}
                          {member.social.youtube && (
                            <motion.a
                              whileHover={{ scale: 1.15 }}
                              href={member.social.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on YouTube`}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 hover:bg-[#4676c2] hover:text-white transition-colors"
                            >
                              <Youtube className="h-4 w-4" />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 px-2">
                        <p className="text-white/65 text-sm leading-relaxed">
                          {member.bio}
                        </p>
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 arrow-circle arrow-circle-light"
                  aria-label="Previous team member"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 arrow-circle arrow-circle-light"
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
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                      currentIndex === index
                        ? "w-8 bg-white"
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
            className="font-heading text-3xl font-bold text-white text-center mb-12"
          >
            Our <span className="gradient-text">Values</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="rounded-2xl p-6 bg-white/[0.06] border border-white/10 text-center"
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-white/10 border border-white/10">
                  <value.icon className="h-8 w-8 text-indigo-300" />
                </div>

                <h4 className="font-heading text-xl font-bold text-white mb-4">
                  {value.title}
                </h4>

                <p className="text-white/70 leading-relaxed">
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
          className="mt-20 rounded-3xl p-8 md:p-12 bg-white/[0.06] border border-white/10"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">Lubech</span>?
            </h3>
            <p className="text-white/70 text-lg">
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
