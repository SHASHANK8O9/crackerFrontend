"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // This is where you would normally authenticate with a backend
        // For now, we'll just accept any valid form submission

        // Mock credentials for demo purposes
        if (values.email === "admin@example.com" && values.password === "password") {
            // Store some user info in localStorage (in a real app, you'd use a more secure method)
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: "Admin User",
                    email: values.email,
                    avatar: "/placeholder-user.jpg",
                }),
            )

            // Redirect to dashboard
            router.push("/admin")
        } else {
            toast.error("Invalid credentials", {
                description: "Please use admin@example.com / password for demo",
            })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the admin panel</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        For demo purposes, use:
                        <br />
                        Email: admin@example.com
                        <br />
                        Password: password
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

