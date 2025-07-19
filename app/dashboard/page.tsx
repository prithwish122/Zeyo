"use client"
import { useState } from "react"
import type React from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Activity,
  ChevronRight,
  Globe,
  Users,
  BarChart3,
  Settings,
  Trophy,
  TrendingUp,
  FileText,
  Search,
  PieChart,
  Shield,
  Zap,
  Target,
  ArrowLeft,
  Check,
  Loader2,
  Copy,
  Star,
  Crown,
  Award,
  X,
  Wallet,
} from "lucide-react"
import { Vortex } from "@/components/ui/vortex"
import ConnectButton from "@/components/Connectbutton"
import ZeyoNavbar from "@/components/Zeyo-navbar"
import DashNavbar from "@/components/dashboard-bar"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useWriteContract } from "wagmi"
import propAbi from "@/contract/abi.json"

export default function ZeyoDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "generate-proof">("dashboard")
  const [showWalletModal, setShowWalletModal] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setWalletConnected(true)
    setIsConnecting(false)
    setShowWalletModal(false)
  }

  const handleCloseModal = () => {
    setShowWalletModal(false)
  }

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

      {/* Wallet Connection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full mx-4"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Content */}
              <div className="text-center space-y-6">
                

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Connect you Wallet</h2>
                  
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <ConnectButton/>
                </div>

                

                <p className="text-gray-400 text-xs">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <ZeyoSidebar
          onGenerateProof={() => setCurrentView("generate-proof")}
          onDashboard={() => setCurrentView("dashboard")}
          currentView={currentView}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* <ZeyoNavbar/> */}
          <DashNavbar/>
          <AnimatePresence mode="wait">
            {currentView === "dashboard" ? (
              <ZeyoMainContent key="dashboard" />
            ) : (
              <GenerateProofView key="generate-proof" onBack={() => setCurrentView("dashboard")} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Updated Sidebar Component
const ZeyoSidebar = ({
  onGenerateProof,
  onDashboard,
  currentView,
}: {
  onGenerateProof: () => void
  onDashboard: () => void
  currentView: string
}) => {
  const menuItems = [
    { title: "Dashboard", icon: BarChart3, active: currentView === "dashboard", onClick: onDashboard },
    { title: "Generate Proof", icon: FileText, active: currentView === "generate-proof", onClick: onGenerateProof },
    { title: "Verify Credentials", icon: Search, active: false, onClick: () => {} },
    { title: "Network Stats", icon: Globe, active: false, onClick: () => {} },
    { title: "Multi-Chain", icon: Users, active: false, onClick: () => {} },
    { title: "Settings", icon: Settings, active: false, onClick: () => {} },
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
              onClick={item.onClick}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.active ? "text-cyan-400" : ""}`} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              {item.active && <ChevronRight className="w-4 h-4 text-cyan-400" />}
            </motion.div>
          ))}
          <ConnectButton  />
        </div>
      </nav>
    </div>
  )
}

// Enhanced Trophy Badge Component
const EnhancedTrophyBadge = ({ badgeMetadata }: { badgeMetadata: any }) => {
  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "diamond":
        return "from-blue-400 via-purple-400 to-pink-400"
      case "platinum":
        return "from-gray-300 via-gray-100 to-gray-300"
      case "gold":
        return "from-yellow-400 via-yellow-300 to-yellow-500"
      case "silver":
        return "from-gray-400 via-gray-300 to-gray-500"
      default:
        return "from-orange-400 via-red-400 to-pink-400"
    }
  }

  const getBadgeIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "diamond":
        return Star
      case "platinum":
        return Crown
      case "gold":
        return Trophy
      case "silver":
        return Award
      default:
        return Trophy
    }
  }

  const BadgeIcon = getBadgeIcon(badgeMetadata.level)

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden relative">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-4 py-8 w-full h-full"
        particleCount={300}
        baseHue={200}
        rangeSpeed={2}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="relative"
        >
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getBadgeColor(badgeMetadata.level)} p-1 shadow-2xl`}
          >
            <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <BadgeIcon className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -inset-4 rounded-full border-2 border-dashed border-white/30"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <h3 className="text-2xl font-bold text-white mb-2">{badgeMetadata.badge_type}</h3>
          <div
            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getBadgeColor(badgeMetadata.level)} text-black font-bold text-sm mb-2`}
          >
            {badgeMetadata.level} Level
          </div>
          <p className="text-gray-300 text-sm">{badgeMetadata.verified_metric}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-4 right-4"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
            <span className="text-white text-xs font-medium">Soulbound NFT</span>
          </div>
        </motion.div>
      </Vortex>
    </div>
  )
}

// 3D Pin Container Component
const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  title?: string
  href?: string
  className?: string
  containerClassName?: string
}) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)")

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)")
  }
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)")
  }

  return (
    <div
      className={`relative group/pin z-50 cursor-pointer ${containerClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={className}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </div>
  )
}

const PinPerspective = ({
  title,
  href,
}: {
  title?: string
  href?: string
}) => {
  return (
    <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target="_blank"
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
            rel="noreferrer"
          >
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">{title}</span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-cyan-600 translate-x-[0.5px] translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-cyan-300 translate-x-[0.5px] translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  )
}

// Glass Button Component
const GlassButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 text-base ${className}`}
      >
        {children}
      </button>
    </div>
  )
}

// Generate Proof View Component
const GenerateProofView = ({ onBack }: { onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [defiActivity, setDefiActivity] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  const [mintingComplete, setMintingComplete] = useState(false)
  const [logs, setLogs] = useState<Array<{ type: "info" | "success" | "error"; message: string; timestamp: string }>>(
    [],
  )

  const addLog = (type: "info" | "success" | "error", message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { type, message, timestamp }])
  }

  const handleVerifyWithCarv = async () => {
    setIsVerifying(true)
    setLogs([])
    const verificationSteps = [
      "Connecting to CARV Agent...",
      "Analyzing DeFi activity data...",
      "Validating transaction history...",
      "Cross-referencing with blockchain data...",
      "Verification complete!",
    ]

    for (let i = 0; i < verificationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (i === verificationSteps.length - 1) {
        addLog("success", verificationSteps[i])
        setVerificationComplete(true)
      } else {
        addLog("info", verificationSteps[i])
      }
    }
    setIsVerifying(false)
  }

  const handleGenerateZkProof = async () => {
    setIsGenerating(true)
    setLogs([])
    const generationSteps = [
      "Initializing ZK-proof generation...",
      "Creating cryptographic commitments...",
      "Generating witness data...",
      "Computing zero-knowledge proof...",
      "ZK-proof generated successfully!",
    ]

    for (let i = 0; i < generationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      if (i === generationSteps.length - 1) {
        addLog("success", generationSteps[i])
        setGenerationComplete(true)
      } else {
        addLog("info", generationSteps[i])
      }
    }
    setIsGenerating(false)
  }


  const { address ,isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
  const { chainId } = useAppKitNetwork() // to get chainid
  const { writeContract, isSuccess } = useWriteContract() 

  const contract_address = "0x6ea56230446eb206cb805494826c33C06971C61E"



  const handleMintBadge = async (defiActivity: string) => {
    setIsMinting(true)
    setLogs([])



    const mintingSteps = [
      "Preparing badge metadata...",
      "Creating soulbound token...",
      "Deploying to blockchain...",
      "Finalizing badge creation...",
      "Badge minted successfully!",
    ]

    for (let i = 0; i < mintingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (i === mintingSteps.length - 1) {
        addLog("success", mintingSteps[i])
        setMintingComplete(true)
      } else {
        addLog("info", mintingSteps[i])
      }
    }

     writeContract({
      abi: propAbi,
      functionName: "mintBadge",
      address: contract_address,
      args: [defiActivity],
    })



    setIsMinting(false)
  }

  // Dynamic badge metadata based on input
  const generateBadgeMetadata = () => {
    const activityLower = defiActivity.toLowerCase()
    let badgeType = "DeFi Participant"
    let level = "Bronze"
    let verifiedMetric = "Basic Activity"

    // Parse activity for specific protocols and amounts
    if (activityLower.includes("curve") || activityLower.includes("uniswap") || activityLower.includes("sushiswap")) {
      badgeType = "DEX Trader"
    } else if (
      activityLower.includes("compound") ||
      activityLower.includes("aave") ||
      activityLower.includes("lending")
    ) {
      badgeType = "DeFi Lender"
    } else if (activityLower.includes("liquidity") || activityLower.includes("pool")) {
      badgeType = "Liquidity Provider"
    } else if (activityLower.includes("yield") || activityLower.includes("farm")) {
      badgeType = "Yield Farmer"
    }

    // Determine level based on amounts mentioned
    const amounts = defiActivity.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g)
    if (amounts) {
      const maxAmount = Math.max(...amounts.map((a) => Number.parseFloat(a.replace(/[$,]/g, ""))))
      if (maxAmount >= 100000) {
        level = "Diamond"
        verifiedMetric = `>$${Math.floor(maxAmount / 1000)}K volume`
      } else if (maxAmount >= 50000) {
        level = "Platinum"
        verifiedMetric = `>$${Math.floor(maxAmount / 1000)}K volume`
      } else if (maxAmount >= 10000) {
        level = "Gold"
        verifiedMetric = `>$${Math.floor(maxAmount / 1000)}K volume`
      } else if (maxAmount >= 1000) {
        level = "Silver"
        verifiedMetric = `>$${Math.floor(maxAmount / 1000)}K volume`
      }
    }

    return {
      badge_type: badgeType,
      level: level,
      verified_metric: verifiedMetric,
      activity_description: defiActivity,
      wallet: "0x123...456",
      proof_hash: "0xabc...",
      issued_by: "Zeyo + CARV",
      timestamp: new Date().toISOString(),
      soulbound: true,
      visibility: "private",
    }
  }

  const zkProofMetadata = {
    activity: defiActivity || "No activity specified",
    volume: ">1000",
    wallet: "0x****",
    zkProof: "0xabc123...",
  }

  const badgeMetadata = generateBadgeMetadata()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="ml-72 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        {/* Step Indicator */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === currentStep
                    ? "bg-cyan-400 text-black"
                    : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-white/10 text-gray-400"
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-1 mx-2 transition-all ${step < currentStep ? "bg-green-500" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout - Increased Height */}
      <div className="grid grid-cols-12 gap-6">
        {currentStep === 1 && (
          <>
            {/* Step 1: Input Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <FileText className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Enter DeFi Activity</h3>
              </div>
              <div className="space-y-8">
                <textarea
                  value={defiActivity}
                  onChange={(e) => setDefiActivity(e.target.value)}
                  placeholder="Describe your DeFi activity (e.g., 'Traded $15,000 on Curve Finance', 'Provided liquidity to Uniswap V3', etc.)"
                  className="w-full h-48 p-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none resize-none text-lg"
                />
                <div className="space-y-4">
                  <GlassButton
                    onClick={handleVerifyWithCarv}
                    disabled={!defiActivity.trim() || isVerifying || verificationComplete}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Verifying with CARV...</span>
                      </>
                    ) : verificationComplete ? (
                      <>
                        <Check className="w-6 h-6" />
                        <span>Verified Successfully</span>
                      </>
                    ) : (
                      <span>Verify with CARV</span>
                    )}
                  </GlassButton>
                  <div className="text-center">
                    <span className="text-gray-400 text-sm">Powered by CARV</span>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Step 1: Logs Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <LogContainer logs={logs} title="Verification Logs" />
            </motion.div>
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <div className="text-gray-400 text-lg">Step 1 of 3: Verify DeFi Activity</div>
                <GlassButton
                  onClick={() => setCurrentStep(2)}
                  disabled={!verificationComplete}
                  className="!w-auto !px-6 !py-3"
                >
                  Next Step
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Step 2: Metadata Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">ZK-Proof Metadata</h3>
              </div>
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Metadata JSON</span>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(zkProofMetadata, null, 2)}
                  </pre>
                </div>
                <GlassButton onClick={handleGenerateZkProof} disabled={isGenerating || generationComplete}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Generating ZK-Proof...</span>
                    </>
                  ) : generationComplete ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>ZK-Proof Generated</span>
                    </>
                  ) : (
                    <span>Generate ZK-Proof</span>
                  )}
                </GlassButton>
              </div>
            </motion.div>
            {/* Step 2: Logs Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <LogContainer logs={logs} title="Generation Logs" />
            </motion.div>
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <GlassButton
                  onClick={() => setCurrentStep(1)}
                  className="!w-auto !px-6 !py-3 !bg-white/10 hover:!bg-white/20"
                >
                  Previous
                </GlassButton>
                <div className="text-gray-400 text-lg">Step 2 of 3: Generate ZK-Proof</div>
                <GlassButton
                  onClick={() => setCurrentStep(3)}
                  disabled={!generationComplete}
                  className="!w-auto !px-6 !py-3"
                >
                  Next Step
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Step 3: Badge Section with Enhanced Trophy - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Trophy className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Mint Badge</h3>
              </div>
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Badge Metadata</span>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(badgeMetadata, null, 2)}
                  </pre>
                </div>

                {mintingComplete && <EnhancedTrophyBadge badgeMetadata={badgeMetadata} />}

                <GlassButton onClick={() => handleMintBadge(defiActivity)} disabled={isMinting || mintingComplete}>
                  {isMinting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Minting Badge...</span>
                    </>
                  ) : mintingComplete ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>Badge Minted Successfully</span>
                    </>
                  ) : (
                    <span>Mint Badge</span>
                  )}
                </GlassButton>
              </div>
            </motion.div>
            {/* Step 3: Logs Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <LogContainer logs={logs} title="Minting Logs" />
            </motion.div>
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <GlassButton
                  onClick={() => setCurrentStep(2)}
                  className="!w-auto !px-6 !py-3 !bg-white/10 hover:!bg-white/20"
                >
                  Previous
                </GlassButton>
                <div className="text-gray-400 text-lg">Step 3 of 3: Mint Badge</div>
                <GlassButton onClick={onBack} disabled={!mintingComplete} className="!w-auto !px-6 !py-3">
                  Complete
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// Log Container Component
const LogContainer = ({
  logs,
  title,
}: {
  logs: Array<{ type: "info" | "success" | "error"; message: string; timestamp: string }>
  title: string
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-medium text-white">{title}</h4>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>
      <div className="flex-1 bg-black/20 rounded-lg p-6 border border-white/5">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-400 text-lg">Logs will appear here...</p>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 p-3 rounded text-base ${
                  log.type === "success" ? "text-green-400" : log.type === "error" ? "text-red-400" : "text-blue-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    log.type === "success" ? "bg-green-400" : log.type === "error" ? "bg-red-400" : "bg-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <p>{log.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Original Dashboard Components
const ZeyoMainContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="ml-72 space-y-8 pt-20"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ReputationTimelineCard />
        </div>
        <div className="col-span-4">
          <ProofTypeDistributionCard />
        </div>
        <div className="col-span-6">
          <RecentActivityCard />
        </div>
        <div className="col-span-6">
          <MultiChainReputationCard />
        </div>
      </div>
    </motion.div>
  )
}

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
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <div key={filter.id} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-1">
                <button
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              </div>
            ))}
          </div>
        </div>
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Proofs</div>
              </div>
            </div>
          </div>
        </div>
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
