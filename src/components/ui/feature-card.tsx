import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary opacity-50 transition-all duration-300 group-hover:scale-110"></div>
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white shadow-md">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

