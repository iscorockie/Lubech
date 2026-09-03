"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCommentDots,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaFileAlt,
  FaExclamationCircle,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email";
        return "";
      case "project":
        if (!value.trim()) return "Project type is required";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const allTouched: Record<string, boolean> = {};
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
      const err = validateField(key, formData[key as keyof typeof formData]);
      if (err) newErrors[key] = err;
    });
    setTouched(allTouched);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          project: "",
          budget: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      }, 4000);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "info@lubech.tech",
      description: "Send us an email anytime",
      accent: "#4676C2",
      href: "mailto:info@lubech.tech",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+44 7572 964620",
      description: "Mon–Fri, 9 am – 6 pm",
      accent: "#59C368",
      href: "tel:+447572964620",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      details: "28 Foxwell Square NN35AT Northampton",
      description: "Available worldwide remotely",
      accent: "#f59e0b",
      href: "https://maps.google.com/?q=28 Foxwell Square NN35AT Northampton",
    },
    {
      icon: FaCommentDots,
      title: "Live Chat",
      details: "WhatsApp us",
      description: "Get instant support",
      accent: "#a78bfa",
      href: "https://wa.me/447572964620",
    },
  ];

  const budgetRanges = [
    "$600 – $2,000",
    "$2,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000 – $30,000",
    "$30,000+",
    "Not sure yet",
  ];

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "E-commerce Platform",
    "Backend / API",
    "UI/UX Design",
    "Full-stack Solution",
    "Other",
  ];

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 transition-all duration-200 text-white placeholder-white/30 outline-none";
  const inputNormal =
    "border-white/10 focus:border-[#4676c2] focus:ring-2 focus:ring-[#4676c2]/15";
  const inputError =
    "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/20";

  const FieldError = ({ field }: { field: string }) =>
    errors[field] && touched[field] ? (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <FaExclamationCircle className="h-3 w-3 flex-shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label mb-4">Contact</span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight text-white mb-5 max-w-2xl">
            Are you ready to start?{" "}
            <span className="gradient-text">Submit your request</span>
          </h2>

          <p className="text-lg text-white/60 max-w-xl">
            Ready to bring your ideas to life? Tell us about your project and
            we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Contact Info
            </h3>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={{ x: 6 }}
                  className="card flex items-start gap-4 p-4 rounded-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${info.accent}22` }}
                  >
                    <info.icon
                      style={{ color: info.accent }}
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {info.title}
                    </p>
                    <p className="text-white/75 text-sm mt-0.5 font-numeric">
                      {info.details}
                    </p>
                    <p className="text-white/45 text-xs mt-0.5">
                      {info.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Business hours */}
            <div className="card p-5 rounded-2xl mt-2">
              <div className="flex items-center gap-2 mb-4">
                <FaClock className="h-4 w-4 text-[#4676c2]" />
                <h4 className="text-white font-semibold text-sm">
                  Business Hours
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ["Monday – Friday", "9:00 AM – 6:00 PM"],
                  ["Saturday", "10:00 AM – 4:00 PM"],
                  ["Sunday", "Closed"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-white/70">
                    <span>{day}</span>
                    <span className="text-white/90 font-numeric">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            {/* Form card */}
            <div className="card rounded-3xl p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  Let&apos;s start your growth today
                </h3>
                <p className="text-white/55 text-sm mb-8">
                  Fill in the details below and we&apos;ll be in touch shortly.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-14"
                  >
                    <FaCheckCircle className="h-16 w-16 text-[#59c368] mx-auto mb-5" />
                    <h4 className="font-heading text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-white/60">
                      We&apos;ve received your enquiry and will reply within 24
                      hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-white/75 mb-2"
                        >
                          Full Name <span className="text-[#59c368]">*</span>
                        </label>
                        <div className="relative">
                          <FaUser
                            className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.name && touched.name ? "text-red-400" : "text-white/35"}`}
                          />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${inputBase} ${errors.name && touched.name ? inputError : inputNormal}`}
                            placeholder="John Doe"
                          />
                        </div>
                        <FieldError field="name" />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white/75 mb-2"
                        >
                          Email Address{" "}
                          <span className="text-[#59c368]">*</span>
                        </label>
                        <div className="relative">
                          <FaEnvelope
                            className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.email && touched.email ? "text-red-400" : "text-white/35"}`}
                          />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
                            placeholder="john@example.com"
                          />
                        </div>
                        <FieldError field="email" />
                      </div>
                    </div>

                    {/* Phone + Project type row */}
                    {/* Phone number */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-white/75 mb-2"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`${inputBase} ${inputNormal}`}
                          placeholder="+256 700 000 000"
                        />
                      </div>
                    </div>

                    {/* Project type + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="project"
                          className="block text-sm font-medium text-white/75 mb-2"
                        >
                          Project Type <span className="text-[#59c368]">*</span>
                        </label>
                        <select
                          id="project"
                          name="project"
                          required
                          value={formData.project}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 transition-all duration-200 text-white outline-none ${errors.project && touched.project ? inputError : inputNormal}`}
                        >
                          <option value="" className="bg-[#10143a] text-white">
                            Select type
                          </option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t} className="bg-[#10143a] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                        <FieldError field="project" />
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium text-white/75 mb-2"
                        >
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 focus:border-[#4676c2] focus:ring-2 focus:ring-[#4676c2]/15 transition-all duration-200 text-white outline-none"
                        >
                          <option value="" className="bg-[#10143a] text-white">
                            Select budget
                          </option>
                          {budgetRanges.map((r) => (
                            <option key={r} value={r} className="bg-[#10143a] text-white">
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white/75 mb-2"
                      >
                        Project Details{" "}
                        <span className="text-[#59c368]">*</span>
                      </label>
                      <div className="relative">
                        <FaFileAlt
                          className={`absolute left-3.5 top-3.5 h-4 w-4 ${errors.message && touched.message ? "text-red-400" : "text-white/35"}`}
                        />
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputBase} resize-none pt-3 ${errors.message && touched.message ? inputError : inputNormal}`}
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                        />
                      </div>
                      <FieldError field="message" />
                    </div>

                    {/* Server error */}
                    {submitError && (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <FaExclamationCircle className="h-4 w-4 flex-shrink-0" />
                        {submitError}
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full pill pill-dark py-4 rounded-full text-base shadow-lg shadow-black/20 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="h-5 w-5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
