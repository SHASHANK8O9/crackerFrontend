"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X, Loader2 } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { toast } from "sonner"

interface ImageUploadProps {
    value: string
    onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value || null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setPreview(value || null)
    }, [value])

    const uploadToCloudinary = async (file: File) => {
        try {
            setIsLoading(true)

            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", "CrackerFrontend")
            formData.append("folder", "DUMMY")

            // Log form data for debugging
            formData.forEach((value, key) => {
                console.log("Key:", key, "Value:", value)
            })

            const cloudinaryUrl = `${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_URL}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
            console.log("Upload URL:", cloudinaryUrl)

            const response = await axios.post(cloudinaryUrl, formData)

            if (!response?.data?.asset_id) {
                throw new Error("Failed to upload image")
            }

            const { asset_id, public_id, secure_url } = response.data
            const imageUrl = response.data.eager?.[0]?.secure_url || secure_url

            console.log("Upload successful:", { asset_id, public_id, imageUrl })

            // Set the Cloudinary URL as the value
            setPreview(imageUrl)
            onChange(imageUrl)

            toast.success("Image uploaded", {
                description: "Your image has been uploaded successfully",
            })
        } catch (error) {
            console.error("Error uploading image:", error)
            toast.error("Upload failed", {
                description: "Failed to upload image to Cloudinary",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Show a temporary preview immediately
        const reader = new FileReader()
        reader.onloadend = () => {
            const result = reader.result as string
            setPreview(result)
        }
        reader.readAsDataURL(file)

        // Upload to Cloudinary
        uploadToCloudinary(file)
    }

    const handleRemove = () => {
        setPreview(null)
        onChange("")
    }

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                {isLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                        <p className="text-sm text-muted-foreground">Uploading to Cloudinary...</p>
                    </div>
                ) : preview ? (
                    <div className="relative w-full h-48">
                        <Image src={preview || "/placeholder.svg"} alt="Category preview" fill className="object-contain" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center justify-center">
                        <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-4">Upload category image</p>
                        <label htmlFor="image-upload">
                            <Button type="button" variant="secondary" size="sm" className="cursor-pointer" asChild>
                                <span>Select Image</span>
                            </Button>
                            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                )}
            </div>
            {!preview && !isLoading && (
                <p className="text-xs text-muted-foreground">Recommended: Square image (1:1 ratio) in JPG, PNG format</p>
            )}
        </div>
    )
}

