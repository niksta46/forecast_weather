import { Inbox } from 'lucide-react'

export function EmptyState({ message = 'No data available', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-gray-500 ${className}`}>
      <Inbox className="w-12 h-12 mb-4" />
      <p>{message}</p>
    </div>
  )
}
