// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600" />

        {/* Testo di caricamento */}
        <p className="text-lg font-light tracking-wide">Caricamento in corso...</p>
      </div>
    </div>
  )
}
