"use client"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Shield, Zap, Lock, BarChart3, Globe, FileText } from "lucide-react"
import { motion } from "motion/react"
import { Meteors } from "@/components/ui/meteors"

export default function WhyChooseZeyo() {
  return (
    <div className="w-full bg-black py-24 roboto-regular">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl text-white mb-6 tracking-tight"
          >
            Why Choose Zeyo?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto roboto-light"
          >
            Privacy-first reputation system built for the decentralized future
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

// Instant Proof Generation Animation
const SkeletonOne = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 flex-col space-y-4 relative overflow-hidden p-4 rounded-xl border border-slate-700/50"
    >
      <Meteors number={15} />

      {/* Block Time Display */}
      <div className="text-center">
        <div className="text-xs text-cyan-400 mb-1 roboto-medium tracking-wider">PROOF GENERATION</div>
        <motion.div
          className="text-4xl font-bold text-white roboto-bold"
          animate={{
            scale: [1, 1.05, 1],
            color: ["#ffffff", "#06b6d4", "#ffffff"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          0.3s
        </motion.div>
        <div className="text-sm text-emerald-400 mt-1 roboto-medium">Your credentials, verified instantly</div>
      </div>

      {/* Progress Animation */}
      <div className="space-y-2">
        <motion.div
          className="h-2 bg-slate-700/50 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="text-xs text-slate-300 roboto-light">
          zkProof leverages parallel processing for ultra-fast credential verification
        </div>
      </div>
    </motion.div>
  )
}

// Fee Comparison Animation
const SkeletonTwo = () => {
  const platforms = [
    {
      name: "Traditional KYC",
      fee: "$25-100",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/10 border-red-500/30",
    },
    {
      name: "LinkedIn Premium",
      fee: "$29.99",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10 border-orange-500/30",
    },
    {
      name: "Coursera Plus",
      fee: "$59",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10 border-amber-500/30",
    },
    {
      name: "Zeyo zkProofs",
      fee: "$0.01",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10 border-emerald-500/30",
    },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-4 relative overflow-hidden rounded-xl border border-slate-700/50">
      <Meteors number={10} />
      <div className="w-full space-y-3">
        <div className="text-center text-sm text-cyan-400 mb-4 roboto-medium tracking-wider">COST COMPARISON</div>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-3 rounded-lg ${platform.bgColor} border backdrop-blur-sm`}
            >
              <div className="text-xs text-slate-200 font-medium roboto-medium">{platform.name}</div>
              <div className="text-lg font-bold text-white roboto-bold">{platform.fee}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center text-xs text-emerald-400 mt-2 roboto-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          99% cheaper than traditional verification
        </motion.div>
      </div>
    </motion.div>
  )
}

// Privacy vs Transparency Balance
const SkeletonThree = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-4 relative overflow-hidden rounded-xl border border-slate-700/50">
      <Meteors number={20} />
      <div className="w-full flex flex-col justify-center space-y-4">
        <div className="text-center">
          <div className="text-sm text-cyan-400 mb-2 roboto-medium tracking-wider">PRIVACY + VERIFIABILITY</div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-red-400 roboto-light">Full Exposure</div>
            <div className="text-xs text-emerald-400 roboto-light">Zero Knowledge</div>
          </div>

          {/* Balance Scale Animation */}
          <div className="relative mt-4">
            <motion.div
              className="w-full h-1 bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0.8)",
                  "0 0 10px rgba(16, 185, 129, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-white rounded-full top-1/2 transform -translate-y-1/2 shadow-lg"
              animate={{ left: ["10%", "90%", "90%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="text-xs text-center text-slate-300 roboto-light">
          Prove your achievements without revealing sensitive data
        </div>
      </div>
    </motion.div>
  )
}

// Real-time Analytics Dashboard
const SkeletonFour = () => {
  const metrics = [
    { label: "Proofs Generated", value: "1,247", change: "+23%", color: "text-emerald-400" },
    { label: "DAOs Integrated", value: "89", change: "+12%", color: "text-cyan-400" },
    { label: "Privacy Score", value: "99.8%", change: "+0.2%", color: "text-violet-400" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 relative overflow-hidden p-4 rounded-xl border border-slate-700/50">
      <Meteors number={12} />

      <div className="w-full space-y-4">
        <div className="text-sm text-cyan-400 text-center mb-4 roboto-medium tracking-wider">LIVE NETWORK STATS</div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className="bg-slate-800/30 rounded-lg p-2 border border-slate-600/30 backdrop-blur-sm"
            >
              <div className="text-xs text-slate-400 roboto-light">{metric.label}</div>
              <motion.div
                className="text-lg font-bold text-white roboto-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
              >
                {metric.value}
              </motion.div>
              <div className={`text-xs ${metric.color} roboto-medium`}>{metric.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Animated Chart */}
        <div className="flex items-end justify-between h-16 space-x-1">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm flex-1"
              initial={{ height: "20%" }}
              animate={{ height: `${height}%` }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Cross-Chain Network Animation
const SkeletonFive = () => {
  const chains = [
    { name: "zkSync", x: 20, y: 30, color: "from-violet-400 to-violet-600" },
    { name: "Scroll", x: 80, y: 25, color: "from-orange-400 to-orange-600" },
    { name: "Polygon", x: 50, y: 70, color: "from-purple-400 to-purple-600" },
    { name: "Arbitrum", x: 25, y: 75, color: "from-blue-400 to-blue-600" },
    { name: "Optimism", x: 75, y: 65, color: "from-red-400 to-red-600" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 relative overflow-hidden p-4 rounded-xl border border-slate-700/50">
      <Meteors number={8} />

      <div className="w-full h-full relative">
        <div className="text-xs text-cyan-400 text-center mb-4 roboto-medium tracking-wider">
          MULTI-CHAIN REPUTATION
        </div>

        {/* Chain Nodes */}
        {chains.map((chain, i) => (
          <motion.div
            key={chain.name}
            className={`absolute w-8 h-8 bg-gradient-to-r ${chain.color} rounded-full flex items-center justify-center shadow-lg`}
            style={{ left: `${chain.x}%`, top: `${chain.y}%`, transform: "translate(-50%, -50%)" }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(6, 182, 212, 0.4)",
                "0 0 0 8px rgba(6, 182, 212, 0)",
                "0 0 0 0 rgba(6, 182, 212, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.4 }}
          >
            <div className="text-xs font-bold text-white roboto-bold">{chain.name.slice(0, 2)}</div>
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {chains.map((chain, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${chain.x}%`}
              y1={`${chain.y}%`}
              x2="50%"
              y2="50%"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
            />
          ))}
        </svg>

        {/* Central Hub */}
        <motion.div
          className="absolute w-6 h-6 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="text-xs font-bold text-white roboto-bold">Z</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Credential Creation Process
const SkeletonSix = () => {
  const steps = [
    { icon: "🔗", label: "Connect Wallet", status: "completed" },
    { icon: "📊", label: "Analyze Activity", status: "completed" },
    { icon: "🛡️", label: "Generate Proof", status: "active" },
    { icon: "✅", label: "Mint Badge", status: "pending" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 relative overflow-hidden p-4 rounded-xl border border-slate-700/50">
      <Meteors number={15} />

      <div className="w-full flex flex-col justify-center space-y-4">
        <div className="text-center">
          <div className="text-2xl mb-2">🏆</div>
          <div className="text-sm text-cyan-400 mb-4 roboto-medium tracking-wider">CREATE YOUR REPUTATION</div>
        </div>

        <div className="space-y-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/30 border border-slate-600/30 backdrop-blur-sm"
            >
              <div className="text-lg">{step.icon}</div>
              <div className="text-xs text-white roboto-medium flex-1">{step.label}</div>
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  step.status === "completed"
                    ? "bg-emerald-400"
                    : step.status === "active"
                      ? "bg-cyan-400"
                      : "bg-slate-500"
                }`}
                animate={step.status === "active" ? { scale: [0.8, 1.2, 0.8] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-xs text-center text-slate-300 mt-2 roboto-light">
          Set up your verifiable credentials in minutes
        </div>
      </div>
    </motion.div>
  )
}

const items = [
  {
    title: "Instant Proof Generation",
    description: (
      <span className="text-sm roboto-light">
        Generate verifiable credentials in 0.3 seconds with parallel processing
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Zap className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Ultra-Low Verification Costs",
    description: (
      <span className="text-sm roboto-light">99% cheaper than traditional KYC and credential verification</span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Shield className="h-4 w-4 text-emerald-400" />,
  },
  {
    title: "Privacy-First Verification",
    description: (
      <span className="text-sm roboto-light">Prove achievements without exposing sensitive wallet data</span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Lock className="h-4 w-4 text-violet-400" />,
  },
  {
    title: "Real-Time Network Analytics",
    description: (
      <span className="text-sm roboto-light">Live dashboard showing proof generation and network adoption metrics</span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <BarChart3 className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Cross-Chain Reputation",
    description: (
      <span className="text-sm roboto-light">Unified reputation system across zkSync, Scroll, Polygon, and more</span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Globe className="h-4 w-4 text-orange-400" />,
  },
  // {
  //   title: "Simple Credential Creation",
  //   description: (
  //     <span className="text-sm roboto-light">Four-step process to create and mint verifiable achievement badges</span>
  //   ),
  //   header: <SkeletonSix />,
  //   className: "md:col-span-1",
  //   icon: <FileText className="h-4 w-4 text-emerald-400" />,
  // },
]
