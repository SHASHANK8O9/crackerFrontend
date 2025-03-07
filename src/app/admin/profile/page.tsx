"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileForm from "@/components/profile-form"

export default function ProfilePage() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem("user")
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your profile information.</CardDescription>
                </CardHeader>
                <CardContent>{user && <ProfileForm initialData={user} />}</CardContent>
            </Card>
        </div>
    )
}

