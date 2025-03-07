"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Package, LayoutDashboard, User } from "lucide-react"

const navItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Profile",
        href: "/admin/profile",
        icon: User,
    },
]

export default function DashboardNav() {
    const pathname = usePathname()

    return (
        <nav className="grid items-start gap-2 p-1">
            {navItems.map((item) => (
                <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn("justify-start", pathname === item.href && "bg-primary text-primary-foreground rounded")}
                    asChild
                >
                    <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                </Button>
            ))}
        </nav>
    )
}

