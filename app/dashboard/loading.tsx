export default function Loading() {
    // This component is used to show a loading state while the dashboard is being loaded.

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        <p className="text-gray-700 mt-4">Loading...</p>
    </div>
    )
}
