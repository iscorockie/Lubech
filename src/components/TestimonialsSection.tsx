"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "Labour Experts",
    content:
      "Lubech transformed our vision into a powerful platform. Their expertise in web development and attention to detail exceeded our expectations. The team delivered on time and within budget.",
    rating: 5,
  },
  {
    id: "2",
    name: "Barbara Kenyana",
    role: "Founder",
    company: "Glam n' Go",
    content:
      "Working with Lubech was a game-changer. They built our e-commerce app with such professionalism and care. Our app has over 5K downloads and growing. Highly recommend!",
    rating: 5,
  },
  {
    id: "3",
    name: "James Ochen",
    role: "Director",
    company: "Tuwe Technologies",
    content:
      "The team at Lubech understood our community management needs perfectly. They created a robust platform that serves thousands of users. Their backend expertise is outstanding.",
    rating: 5,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Director",
    company: "Ordnancity",
    content:
      "Lubech's technical skills and creative approach helped us build a cutting-edge city management platform. Their support throughout the project was exceptional.",
    rating: 5,
  },
  {
    id: "5",
    name: "Isaac Sekatawa",
    role: "Co-Founder",
    company: "Easy Gas",
    content:
      "From concept to launch, the Lubech team was with us every step of the way. Our delivery app is now live on both stores and users love it. Truly world-class work.",
    rating: 5,
  },
  {
    id: "6",
    name: "Amara Jaffer",
    role: "Owner",
    company: "Cafe Jaf'n",
    content:
      "We needed a food ordering app fast, and Lubech delivered beyond what we imagined. Clean UI, smooth payments, and zero issues after launch. Amazing team.",
    rating: 5,
  },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div className="flex-shrink-0 w-80 md:w-96 card p-6 rounded-2xl">
    <FaQuoteLeft className="h-6 w-6 mb-4" style={{ color: "#4676c2", opacity: 0.7 }} />
    <p className="text-white/80 leading-relaxed mb-6 text-sm">
      &ldquo;{t.content}&rdquo;
    </p>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-white text-sm">{t.name}</p>
        <p className="text-white/50 text-xs mt-0.5">
          {t.role} · {t.company}
        </p>
      </div>
      <div className="flex gap-0.5">
        {[...Array(t.rating)].map((_, i) => (
          <FaStar key={i} className="h-3.5 w-3.5 text-yellow-400" />
        ))}
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="section-label mb-4">Testimonials</span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — here&apos;s what our clients
            say about working with us.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-5">
        <div
          className="flex gap-5 w-max"
          style={{
            animation: "marquee 35s linear infinite",
            willChange: "transform",
          }}
        >
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5 w-max"
          style={{
            animation: "marquee-reverse 35s linear infinite",
            willChange: "transform",
          }}
        >
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
