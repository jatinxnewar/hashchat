export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f]">
      <div className="relative flex items-center justify-center mb-6">
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-blue-500 opacity-30 blur-2xl animate-pulse"></span>
        <span className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></span>
        <span className="absolute h-6 w-6 rounded-full bg-blue-400 opacity-80 blur"></span>
      </div>
      <span className="text-lg font-bold tracking-widest text-blue-200 drop-shadow-lg animate-pulse">
        Loading HashChat...
      </span>
    </div>
  )
}
