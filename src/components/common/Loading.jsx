export function Loading({ fullPage = false, className = '' }) {
  const spinner = (
    <div className={`animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent ${className}`} />
  )

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  )
}
