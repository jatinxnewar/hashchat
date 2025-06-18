import React from "react"

const loadingMessages = [
  "Encrypting your messages...",
  "Establishing secure connection...",
  "Synchronizing with the blockchain...",
  "Generating quantum keys...",
  "Activating stealth mode...",
  "Hashing secrets...",
  "Deploying cyber shields...",
  "Optimizing neural pathways...",
]

const tips = [
  "Tip: Never share your password with anyone.",
  "Did you know? HashChat uses quantum-resistant encryption.",
  "Pro tip: Use scheduled messages for sensitive info.",
  "HashChat: Where privacy meets performance.",
  "Security is a journey, not a destination.",
]

export default function Loading() {
  const [messageIndex, setMessageIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [swap, setSwap] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [tipIndex, setTipIndex] = React.useState(0)
  const [showConfetti, setShowConfetti] = React.useState(false)

  // Progress bar simulation
  React.useEffect(() => {
    if (!paused && progress < 100) {
      const timer = setTimeout(() => setProgress(p => Math.min(p + Math.random() * 10, 100)), 250)
      return () => clearTimeout(timer)
    }
    if (progress >= 100) {
      setShowConfetti(true)
      // Play sound
      const audio = new Audio("https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5b6.mp3")
      audio.volume = 0.2
      audio.play()
    }
  }, [progress, paused])

  // Animated icon swap
  React.useEffect(() => {
    if (paused) return
    const interval = setInterval(() => setSwap(s => !s), 1000)
    return () => clearInterval(interval)
  }, [paused])

  // Cycle loading messages every 2 seconds
  React.useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setMessageIndex(idx => (idx + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [paused])

  // Cycle tips every 4 seconds
  React.useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setTipIndex(idx => (idx + 1) % tips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  // Estimate time remaining (fake, for demo)
  const estimatedSeconds = Math.max(0, Math.round((100 - progress) / 10 * 0.25))

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f]"
      aria-busy={progress < 100}
      aria-live="polite"
    >
      {/* Confetti burst */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <ConfettiBurst />
        </div>
      )}
      {/* Animated gradient ring with orbiting dot */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-500 opacity-20 blur-2xl animate-pulse"></span>
        <span className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></span>
        {/* Orbiting dot with color swap */}
        <span className={`absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full shadow-lg animate-orbit ${swap ? "bg-cyan-400" : "bg-pink-400"}`}></span>
        <span className="absolute h-8 w-8 rounded-full bg-blue-400 opacity-60 blur"></span>
      </div>
      {/* Main loading text */}
      <span className="text-2xl font-extrabold tracking-widest text-blue-200 drop-shadow-lg animate-pulse mb-2">
        Loading HashChat...
      </span>
      {/* Cycling futuristic loading message */}
      <span className="text-sm text-blue-300 tracking-wide animate-fade-in mb-2">
        {loadingMessages[messageIndex]}
      </span>
      {/* Progress percentage label */}
      <span className="mb-1 text-xs text-blue-400 font-mono">{Math.min(Math.round(progress), 100)}%</span>
      {/* Estimated time remaining */}
      <span className="mb-2 text-xs text-blue-500 font-mono">
        {progress < 100 ? `~${estimatedSeconds}s remaining` : "Ready!"}
      </span>
      {/* Progress bar */}
      <div className="w-64 h-2 bg-blue-900 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {/* Animated loading dots */}
      <div className="flex space-x-1 mb-4">
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.2s]"></span>
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.1s]"></span>
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></span>
      </div>
      {/* Pause/Resume Button */}
      <button
        className="px-4 py-1 rounded bg-blue-700 text-blue-100 text-xs font-semibold hover:bg-blue-800 transition mb-2"
        onClick={() => setPaused(p => !p)}
      >
        {paused ? "Resume" : "Pause"}
      </button>
      {/* Cycling tip/quote */}
      <span className="mt-2 text-xs text-blue-300 italic animate-fade-in">{tips[tipIndex]}</span>
      {/* Custom keyframes for orbit and fade-in */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(-40px) rotate(0deg);}
          100% { transform: rotate(360deg) translateY(-40px) rotate(-360deg);}
        }
        .animate-orbit {
          animation: orbit 1.2s linear infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }
      `}</style>
    </div>
  )
}

// Simple confetti burst using colored dots
function ConfettiBurst() {
  const confetti = Array.from({ length: 24 })
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-50">
      {confetti.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 10 + Math.random() * 8,
            height: 10 + Math.random() * 8,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
            left: `calc(50% + ${Math.cos((i / confetti.length) * 2 * Math.PI) * 120}px)`,
            top: `calc(50% + ${Math.sin((i / confetti.length) * 2 * Math.PI) * 120}px)`,
            opacity: 0.8,
            animation: `confetti-burst 0.9s cubic-bezier(.61,-0.01,.98,.53)`,
            animationDelay: `${Math.random() * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-burst {
          0% { transform: scale(0.5) translateY(0); opacity: 1;}
          80% { opacity: 1;}
          100% { transform: scale(1.2) translateY(-60px); opacity: 0;}
        }
      `}</style>
    </div>
  )
}
