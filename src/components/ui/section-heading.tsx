import { Badge } from "@/components/ui/badge"

interface SectionHeadingProps {
  badge: string
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeading({ badge, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center mx-auto max-w-3xl" : ""}`}>
      <Badge variant="secondary" className="px-4 py-1 text-sm font-medium uppercase tracking-wider">
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">{title}</h2>
      {description && <p className="text-lg text-gray-600 max-w-3xl">{description}</p>}
    </div>
  )
}

