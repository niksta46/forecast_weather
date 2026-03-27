export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}
