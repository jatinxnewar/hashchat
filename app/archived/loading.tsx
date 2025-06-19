import React from "react"

export default function LoadingScreenEffect() {
  const [visible, setVisible] = React.useState(true)

  // Simulate loading for 2 seconds (customize as needed)
  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-700 animate-fade-in">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
        {/* Loading text */}
        <span className="text-lg text-blue-200 font-semibold tracking-widest animate-pulse">Loading...</span>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s;
        }
      `}</style>
    </div>
  )
}
