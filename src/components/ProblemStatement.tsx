"use client";

import { motion } from "framer-motion";
import { Globe, FileText, Smartphone, Users } from "lucide-react";

const problems = [
  {
    icon: Globe,
    title: "Language Barriers",
    description: "English-dominated portals exclude millions of native speakers",
  },
  {
    icon: FileText,
    title: "Complex Terminology",
    description: "Bureaucratic jargon makes schemes incomprehensible",
  },
  {
    icon: Smartphone,
    title: "Low Digital Literacy",
    description: "Form-driven interfaces exclude non-technical users",
  },
  {
    icon: Users,
    title: "Access Gap",
    description: "The most vulnerable are least likely to benefit",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function ProblemStatement() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-foreground">
            The Problem We're Solving
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Millions of citizens in rural and semi-urban communities fail to access
            vital government schemes. Existing portals are text-heavy and form-driven,
            excluding the very people they are meant to serve.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              className="group p-6 text-center rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-card/80 to-card/20 border border-border/40 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
