"use client"
import { motion } from "motion/react"
import { Meteors } from "@/components/ui/meteors"
import { Shield, Zap, Lock, Award, ArrowRight } from "lucide-react"

export default function HowZeyoWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect & Deposit",
      description:
        "Connect your wallet and deposit assets into secure smart contract vaults with complete privacy protection",
      icon: Shield,
      color: "from-blue-600 to-blue-800",
    },
    {
      number: "02",
      title: "Generate zkProofs",
      description:
        "Create zero-knowledge proofs of your trading performance without revealing sensitive data or balances",
      icon: Zap,
      color: "from-blue-700 to-blue-900",
    },
    {
      number: "03",
      title: "Trade Privately",
      description: "Execute trades and track portfolio performance while maintaining complete privacy and security",
      icon: Lock,
      color: "from-blue-800 to-blue-950",
    },
    {
      number: "04",
      title: "Export zkBadges",
      description: "Generate verifiable credentials to prove your trading skills without exposing your actual data",
      icon: Award,
      color: "from-blue-600 to-blue-900",
    },
  ]

  return (
    <div className="w-full bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-6 font-sans"
          >
            How Zeyo Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-200/80 max-w-3xl mx-auto font-sans"
          >
            Simple steps to private DeFi trading with zero-knowledge proofs and advanced privacy features
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative h-80 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/50 to-black overflow-hidden hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-2">
                {/* Meteor Effect */}
                <Meteors number={15} className="opacity-60" />

                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="text-blue-400/60 text-sm font-mono mb-4">{step.number}</div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                      <step.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300 font-sans">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-blue-200/70 text-sm leading-relaxed flex-1 font-sans">{step.description}</p>

                  {/* Arrow for flow indication */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-blue-400/40" />
                    </div>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 font-sans">
            Start Trading Privately
          </button>
        </motion.div>
      </div>
    </div>
  )
}
