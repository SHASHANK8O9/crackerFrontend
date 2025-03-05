import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
    title: string
    icon: string
    href: string
}

export function CategoryCard({ title, icon, href }: CategoryCardProps) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
            <div className="relative mb-3 h-16 w-16">
                <Image src={icon || "/placeholder.svg"} alt={title} width={64} height={64} className="object-contain" />
            </div>
            <h3 className="font-medium text-gray-900">{title}</h3>
        </Link>
    )
}

