"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Package, LayoutDashboard, User, Menu } from "lucide-react"

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
]

export default function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <div className="px-7">
                    <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                        <span className="font-bold">Admin Panel</span>
                    </Link>
                </div>
                <div className="mt-8 flex flex-col gap-2 px-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            variant={pathname === item.href ? "default" : "ghost"}
                            className={cn("justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
                            asChild
                            onClick={() => setOpen(false)}
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

