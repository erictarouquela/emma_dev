/**
 * Full-page loading screen shown during initial auth check and Suspense fallbacks.
 */
export function LoadingScreen() {
  return (
    <div
      role="status"
      aria-label="A carregar..."
      className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950 z-50"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-700 rounded-full animate-spin dark:border-slate-700 dark:border-t-emerald-400" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">A carregar...</p>
      </div>
    </div>
  )
}
