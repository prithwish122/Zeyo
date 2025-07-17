"use client"

import { useState } from "react"
import { motion } from "motion/react"
import {
  Activity,
  ChevronRight,
  Globe,
  Users,
  BarChart3,
  Settings,
  Trophy,
  Coins,
  TrendingUp,
  FileText,
  Search,
  PieChart,
  Shield,
  Zap,
  Target,
} from "lucide-react"

export default function ZeyoDashboard() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <ZeyoSidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <ZeyoMainContent />
        </div>
      </div>
    </div>
  )
}

// Fixed Full Height Sidebar Component
const ZeyoSidebar = () => {
  const menuItems = [
    { title: "Dashboard", icon: BarChart3, active: true },
    { title: "Generate Proof", icon: FileText, active: false },
    { title: "Verify Credentials", icon: Search, active: false },
    { title: "Network Stats", icon: Globe, active: false },
    { title: "Multi-Chain", icon: Users, active: false },
    { title: "Settings", icon: Settings, active: false },
  ]

  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-20">
      {/* Navigation */}
      <nav className="flex-1 px-6 py-8">
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                item.active
                  ? "bg-white/10 backdrop-blur-sm text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.active ? "text-cyan-400" : ""}`} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              {item.active && <ChevronRight className="w-4 h-4 text-cyan-400" />}
            </motion.div>
          ))}
        </div>
      </nav>
    </div>
  )
}

// Main Content - MVP Grid Structure
const ZeyoMainContent = () => {
  return (
    <div className="ml-72 space-y-8 pt-20">
      {/* Header */}
      {/* <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        
      </motion.div> */}

      {/* MVP Dashboard Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Top Row */}
        <div className="col-span-8">
          <ReputationTimelineCard />
        </div>
        <div className="col-span-4">
            <ProofTypeDistributionCard />
        </div>

        {/* Bottom Row */}
        <div className="col-span-6">
          <RecentActivityCard />
        </div>
        <div className="col-span-6">
          <MultiChainReputationCard />
        </div>
      </div>
    </div>
  )
}

// Reputation Timeline Card
const ReputationTimelineCard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", label: "All Activity" },
    { id: "dao", label: "DAO" },
    { id: "trading", label: "Trading" },
    { id: "nft", label: "NFT" },
  ]

  const timelineData = Array.from({ length: 30 }, (_, i) => ({
    day: i,
    score: 70 + Math.sin(i * 0.2) * 15 + Math.random() * 10,
    activity: ["dao", "trading", "nft"][Math.floor(Math.random() * 3)],
  }))

  const filteredData =
    selectedFilter === "all" ? timelineData : timelineData.filter((item) => item.activity === selectedFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">REPUTATION TIMELINE</h3>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Graph */}
        <div className="flex-1 flex items-end justify-between space-x-1 mb-6">
          {filteredData.slice(-25).map((item, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-t from-cyan-400/60 to-cyan-400 rounded-t-sm flex-1 min-w-0 shadow-sm"
              initial={{ height: "0%" }}
              animate={{ height: `${(item.score / 100) * 100}%` }}
              transition={{
                duration: 0.8,
                delay: i * 0.02,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">30 days ago</span>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">
              {Math.round(timelineData[timelineData.length - 1]?.score || 85)}
            </div>
            <div className="text-gray-400 text-sm">Current Score</div>
          </div>
          <span className="text-gray-400 text-sm">Today</span>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced On-Chain Achievements Card with Pie Chart
const ProofTypeDistributionCard = () => {
  const proofTypes = [
    {
      title: "Identity Verification",
      value: 2847,
      color: "#8b5cf6",
      icon: Shield,
    },
    {
      title: "Credential Proofs",
      value: 1923,
      color: "#f59e0b",
      icon: Trophy,
    },
    {
      title: "Transaction Proofs",
      value: 1456,
      color: "#10b981",
      icon: Zap,
    },
    {
      title: "Reputation Proofs",
      value: 892,
      color: "#ef4444",
      icon: Target,
    },
  ]

  const total = proofTypes.reduce((sum, item) => sum + item.value, 0)

  // Calculate proper percentages and cumulative angles
  const proofTypesWithPercentages = proofTypes.map((proof) => ({
    ...proof,
    percentage: Math.round((proof.value / total) * 100),
  }))

  let cumulativeAngle = 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-6">
          <PieChart className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">PROOF TYPE DISTRIBUTION</h3>
        </div>

        {/* Enhanced Pie Chart */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {proofTypesWithPercentages.map((proof, i) => {
                const angle = (proof.value / total) * 360
                const radius = 80
                const circumference = 2 * Math.PI * radius
                const strokeDasharray = circumference
                const strokeDashoffset = circumference - (circumference * proof.value) / total

                const result = (
                  <motion.circle
                    key={proof.title}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke={proof.color}
                    strokeWidth="16"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="drop-shadow-lg"
                    style={{
                      transformOrigin: "100px 100px",
                      transform: `rotate(${cumulativeAngle}deg)`,
                      filter: `drop-shadow(0 0 8px ${proof.color}40)`,
                    }}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, delay: i * 0.2 + 0.3, ease: "easeInOut" }}
                  />
                )

                cumulativeAngle += angle
                return result
              })}
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Proofs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof Type Legend */}
        <div className="space-y-3">
          {proofTypesWithPercentages.map((proof, i) => (
            <motion.div
              key={proof.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: proof.color }} />
                <div>
                  <div className="text-white font-medium text-sm">{proof.title}</div>
                  <div className="text-gray-400 text-xs">{proof.value.toLocaleString()} proofs</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-sm">{proof.percentage}%</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Network Stats */}
        <div className="mt-4 p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-medium text-sm">Network Efficiency</span>
            </div>
            <div className="text-cyan-400 font-bold text-lg">99.7%</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Recent Activity Card
const RecentActivityCard = () => {
  const activities = [
    {
      type: "proof",
      title: "ZK Proof Generated",
      description: "DeFi trading credentials verified",
      amount: "-0.01 ZKP",
      time: "2m ago",
      status: "Completed",
      icon: FileText,
    },
    {
      type: "verification",
      title: "Credential Verified",
      description: "LinkedIn professional badge",
      amount: "-0.01 ZKP",
      time: "5m ago",
      status: "Success",
      icon: Search,
    },
    {
      type: "mint",
      title: "Achievement Badge",
      description: "Trading volume milestone",
      amount: "+1 Badge",
      time: "8m ago",
      status: "Minted",
      icon: Trophy,
    },
    {
      type: "dao",
      title: "DAO Participation",
      description: "Governance vote submitted",
      amount: "+0.5 ZKP",
      time: "12m ago",
      status: "Rewarded",
      icon: Users,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <Activity className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.4 }}
              className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center border border-cyan-400/20">
                  <activity.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{activity.title}</div>
                  <div className="text-gray-400 text-xs">{activity.description}</div>
                  <div className="text-gray-500 text-xs mt-1">{activity.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-sm font-medium ${
                    activity.amount.startsWith("+") ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {activity.amount}
                </div>
                <div className="text-cyan-400 text-xs">{activity.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Multi-Chain Reputation Card
const MultiChainReputationCard = () => {
  const chains = [
    { name: "zk", color: "#8b5cf6", position: { x: 20, y: 30 } },
    { name: "Sc", color: "#f97316", position: { x: 70, y: 20 } },
    { name: "S", color: "#10b981", position: { x: 50, y: 60 } },
    { name: "Ar", color: "#3b82f6", position: { x: 15, y: 70 } },
    { name: "Po", color: "#8b5cf6", position: { x: 80, y: 65 } },
    { name: "Op", color: "#ef4444", position: { x: 60, y: 25 } },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <Globe className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">MULTI-CHAIN REPUTATION</h3>
        </div>

        <div className="flex-1 flex items-center justify-between">
          {/* Chain Network Visualization */}
          <div className="relative w-80 h-60">
            {chains.map((chain, i) => (
              <motion.div
                key={chain.name}
                className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20"
                style={{
                  backgroundColor: `${chain.color}80`,
                  left: `${chain.position.x}%`,
                  top: `${chain.position.y}%`,
                  boxShadow: `0 0 20px ${chain.color}40`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                {chain.name}
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {chains.flatMap((chain, i) =>
                chains
                  .slice(i + 1)
                  .map((otherChain, j) => (
                    <motion.line
                      key={`${i}-${j}`}
                      x1={`${chain.position.x + 3}%`}
                      y1={`${chain.position.y + 3}%`}
                      x2={`${otherChain.position.x + 3}%`}
                      y2={`${otherChain.position.y + 3}%`}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: (i + j) * 0.1 + 0.8, duration: 0.5 }}
                    />
                  )),
              )}
            </svg>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-gray-400 text-sm">Chains Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">99.8%</div>
              <div className="text-gray-400 text-sm">Reputation Score</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Cross-Chain Reputation</div>
              <div className="text-gray-400 text-sm mt-2">Unified identity across multiple blockchain networks</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
