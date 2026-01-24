"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "Speak Your Need",
    description: "Citizens speak in their local language or dialect via WhatsApp or web",
    color: "mint" as const,
  },
  {
    icon: Search,
    title: "Civic Bridge Searches",
    description: "AI searches public scheme data — scholarships, subsidies, health benefits",
    color: "sky" as const,
  },
  {
    icon: MessageCircle,
    title: "Conversational Guidance",
    description: "Step-by-step assistance through eligibility and application process",
    color: "lavender" as const,
  },
  {
    icon: CheckCircle,
    title: "Track Progress",
    description: "Monitor application status and get timely updates",
    color: "mint" as const,
  },
];

const colorClasses = {
  mint: "bg-mint",
  sky: "bg-sky",
  lavender: "bg-lavender",
};

export function SolutionSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary/80">
            How Civic Bridge Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Civic Bridge acts as a virtual government caseworker, bridging the gap between
            citizens and the benefits they deserve.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-6">
                  <div className={`w-20 h-20 rounded-3xl ${colorClasses[step.color]}/20 backdrop-blur-sm flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300 border border-white/50`}>
                    <step.icon className="w-9 h-9 text-foreground/80" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md rotate-12">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WhatsApp highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border-2 border-border/50 shadow-sm">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-foreground">WhatsApp-First Access</p>
              <p className="text-sm text-muted-foreground">Zero learning curve • Low bandwidth • Familiar interface</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
