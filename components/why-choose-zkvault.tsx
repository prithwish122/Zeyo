"use client"

import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Shield, Zap, Lock, BarChart3, Globe } from "lucide-react"
import { motion } from "motion/react"
import { Meteors } from "@/components/ui/meteors"

export default function WhyChooseZeyo() {
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
            Why Choose Zeyo?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-200/80 max-w-3xl mx-auto font-sans"
          >
            Advanced privacy features for the modern DeFi trader
          </motion.p>
        </div>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  )
}

// Privacy Chat Animation
const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  }
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-900/20 to-transparent flex-col space-y-2 relative overflow-hidden"
    >
      <Meteors number={15} />
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-blue-400/30 p-2 items-center space-x-2 bg-gradient-to-r from-blue-950/50 to-black/50"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shrink-0" />
        <div className="w-full bg-blue-800/30 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-blue-400/30 p-2 items-center space-x-2 w-3/4 ml-auto bg-gradient-to-r from-blue-950/50 to-black/50"
      >
        <div className="w-full bg-blue-800/30 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-blue-400/30 p-2 items-center space-x-2 bg-gradient-to-r from-blue-950/50 to-black/50"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shrink-0" />
        <div className="w-full bg-blue-800/30 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  )
}

// Badge Generation Animation
const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  }
  const arr = new Array(6).fill(0)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-900/20 to-transparent flex-col space-y-2 relative overflow-hidden"
    >
      <Meteors number={10} />
      {arr.map((_, i) => (
        <motion.div
          key={"skeleton-two" + i}
          variants={variants}
          style={{ maxWidth: Math.random() * (100 - 40) + 40 + "%" }}
          className="flex flex-row rounded-full border border-blue-400/30 p-2 items-center space-x-2 bg-blue-800/20 w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  )
}

// Vault Security Animation
const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] },
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2 relative overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #1e40af, #3b82f6, #60a5fa, #1e3a8a)",
        backgroundSize: "400% 400%",
      }}
    >
      <Meteors number={20} />
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  )
}

// Analytics Chart Animation
const SkeletonFour = () => {
  const chartVariants = {
    initial: { height: "20%" },
    animate: {
      height: ["20%", "80%", "40%", "90%", "30%", "70%"],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  const bars = [
    { delay: 0, maxHeight: "80%" },
    { delay: 0.2, maxHeight: "60%" },
    { delay: 0.4, maxHeight: "90%" },
    { delay: 0.6, maxHeight: "70%" },
    { delay: 0.8, maxHeight: "85%" },
    { delay: 1.0, maxHeight: "55%" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-900/20 to-transparent relative overflow-hidden p-4">
      <Meteors number={12} />
      <div className="flex items-end justify-between w-full h-full space-x-2">
        {bars.map((bar, i) => (
          <motion.div
            key={`bar-${i}`}
            initial={{ height: "20%" }}
            animate={{
              height: [bar.maxHeight, "30%", bar.maxHeight],
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: bar.delay,
                ease: "easeInOut",
              },
            }}
            className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm flex-1 min-h-[20%]"
          />
        ))}
      </div>
      {/* Animated line chart overlay */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M10,80 Q30,20 50,40 T90,30"
            stroke="rgba(96, 165, 250, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// Multi-Chain Network Animation
const SkeletonFive = () => {
  const nodeVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  const connectionVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0, 0.8, 0],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  const nodes = [
    { x: 20, y: 30, delay: 0 },
    { x: 50, y: 20, delay: 0.5 },
    { x: 80, y: 35, delay: 1.0 },
    { x: 30, y: 70, delay: 1.5 },
    { x: 70, y: 75, delay: 2.0 },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-900/20 to-transparent relative overflow-hidden">
      <Meteors number={8} />
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100">
        {/* Animated connections */}
        <motion.path
          d="M20,30 L50,20 L80,35 L70,75 L30,70 L20,30"
          stroke="rgba(96, 165, 250, 0.4)"
          strokeWidth="1"
          fill="none"
          variants={connectionVariants}
          initial="initial"
          animate="animate"
        />
        <motion.path
          d="M50,20 L30,70"
          stroke="rgba(96, 165, 250, 0.4)"
          strokeWidth="1"
          fill="none"
          variants={connectionVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        <motion.path
          d="M80,35 L30,70"
          stroke="rgba(96, 165, 250, 0.4)"
          strokeWidth="1"
          fill="none"
          variants={connectionVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.0 }}
        />
      </svg>

      {/* Animated nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          variants={nodeVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: node.delay }}
        />
      ))}

      {/* Central hub */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        animate={{
          scale: [1, 1.3, 1],
          boxShadow: [
            "0 0 0 0 rgba(96, 165, 250, 0.4)",
            "0 0 0 10px rgba(96, 165, 250, 0)",
            "0 0 0 0 rgba(96, 165, 250, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  )
}

const items = [
  {
    title: "Zero-Knowledge Privacy",
    description: <span className="text-sm">Trade privately without revealing wallet addresses or balances</span>,
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Shield className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "zkBadges & Proofs",
    description: <span className="text-sm">Generate verifiable credentials for your trading performance</span>,
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Zap className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Smart Contract Vaults",
    description: <span className="text-sm">Secure asset storage with automated portfolio tracking</span>,
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Lock className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Advanced Analytics",
    description: <span className="text-sm">Track performance metrics without exposing sensitive data</span>,
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <BarChart3 className="h-4 w-4 text-blue-400" />,
  },
  {
    title: "Multi-Chain Support",
    description: <span className="text-sm">Built on zkSync and Scroll with expanding network support</span>,
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Globe className="h-4 w-4 text-blue-400" />,
  },
]
