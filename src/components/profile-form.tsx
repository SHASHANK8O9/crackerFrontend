"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    bio: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof formSchema>

interface ProfileFormProps {
    initialData?: {
        name: string
        email: string
        avatar: string
        bio?: string
    } | null
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter()

    // Default values for the form
    const defaultValues: Partial<ProfileFormValues> = {
        name: initialData?.name || "",
        email: initialData?.email || "",
        bio: initialData?.bio || "",
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    function onSubmit(values: ProfileFormValues) {
        // Here you would typically update the user profile
        console.log(values)

        // Update user data in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({
                ...initialData,
                name: values.name,
                email: values.email,
                bio: values.bio,
            })
        )

        toast.success("Profile updated", {
            description: "Your profile has been updated successfully.",
        })

        // Refresh the page to show updated data
        router.refresh()
    }

    return (
        <div className="space-y-8">
            {/* Avatar and basic info */}
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 rounded-full border-2 border-gray-300">
                    <AvatarImage src={initialData?.avatar || "/placeholder-user.jpg"} alt={initialData?.name || "User"} />
                    <AvatarFallback>{initialData?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-medium">{initialData?.name || "User"}</h3>
                    <p className="text-sm text-muted-foreground">{initialData?.email}</p>
                </div>
            </div>

            {/* Profile Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className="w-full" />
                                </FormControl>
                                <FormDescription>This is the email address you use to sign in.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bio Field */}
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us a little about yourself" className="min-h-[120px] w-full" {...field} />
                                </FormControl>
                                <FormDescription>This will be displayed on your profile.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button type="submit" className="w-full sm:w-auto">Update Profile</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
