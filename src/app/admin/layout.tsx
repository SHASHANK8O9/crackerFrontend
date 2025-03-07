"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MobileNav from "@/components/mobile-nav"
import UserNav from "@/components/user-nav"
import DashboardNav from "@/components/dashboard-nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    // Check if user is logged in on client side
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
        if (!isLoggedIn) {
            router.push("/login")
        } else {
            setIsLoading(false)
        }
    }, [router])

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-background ">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MobileNav />
                    <div className="hidden md:block px-2">
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <UserNav />
                    </div>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden md:block">
                    <DashboardNav />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden py-6">{children}</main>
            </div>
        </div>
    )
}

