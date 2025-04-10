"use client"

import Image from "next/image"
import { Download, ShoppingBag, Send, ChevronRight, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import TestimonialCard from "@/components/testimonial-card"
import { CategoryCard } from "@/components/category-card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"


export default function HomePage() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // Extract values from the URL
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product?page=${page}&search=${search}&category=${category}&limit=${limit}`)
                console.log(data)
                setProducts(data?.data?.products); // Assuming API returns { products: [...] }
            } catch (error) {
                console.error("Error fetching products", error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);
    return (
        <div className="flex min-h-screen flex-col ">
            {/* Hero Section */}
            <div className="w-full min-h-[90vh] bg-gradient-to-br from-blue-50 to-red-100 flex flex-col items-center justify-center px-4 py-20">
                <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
                    {/* Top CTA button */}
                    <Link href="/brands" className="mb-16">
                        <Button
                            variant="outline"
                            className="rounded-full border border-red-300 bg-white/80 text-red-500 hover:bg-white hover:text-red-600 transition-all duration-300 px-6 py-2 h-auto"
                        >
                            Explore how to use for celebrations
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Image className="absolute opacity-20" src='/LogoC.jpg' height={200} width={300} alt="logo" />
                    {/* Main heading */}
                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
                            Light up your Events with <span className="text-red-600">our Firecrackers</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                            Experience premium quality and discover a safer way to celebrate your special occasions brilliantly.
                        </p>

                        <Link href='/products'>
                            <Button className="bg-red-500 cursor-pointer hover:bg-red-600/90">Shop Our Collection</Button>

                        </Link>          </div>
                </div>
            </div>

            {/* Featured Categories */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Explore Our Categories</h2>
                        <p className="mt-4 text-lg text-gray-600">Find the perfect fireworks for every occasion and celebration</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <CategoryCard title="Sparklers" icon="/sparkles.png" href="/categories/sparklers" />
                        <CategoryCard
                            title="Ground Chakkar"
                            icon="/chakri.png"
                            href="/categories/ground-chakkar"
                        />
                        <CategoryCard title="Rockets" icon="/rocket.png" href="/categories/rockets" />
                        <CategoryCard
                            title="Flower Pots"
                            icon="/anaar.png"
                            href="/categories/flower-pots"
                        />
                        <CategoryCard title="Atom Bombs" icon="/bomb.png" href="/categories/atom-bombs" />
                        <CategoryCard title="Gift Boxes" icon="/gift.png" href="/categories/gift-boxes" />
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Best Selling Products</h2>
                            <p className="mt-2 text-lg text-gray-600">Our most popular fireworks loved by customers</p>
                        </div>
                        <Button variant="outline" className="group">
                            View All Products <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.isArray(products) && products.length > 0 && products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Why Choose Vasantham Crackers
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">We're committed to quality, safety, and customer satisfaction</p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Premium Quality</h3>
                            <p className="text-gray-600">
                                We source the finest materials to ensure our products meet the highest standards.
                            </p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Customer Satisfaction</h3>
                            <p className="text-gray-600">
                                Our customers' happiness is our top priority, with prompt service and support.
                            </p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Competitive Pricing</h3>
                            <p className="text-gray-600">
                                Enjoy the best value for your money with our economical pricing structure.
                            </p>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                    <path d="M4 22h16" />
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Safety First</h3>
                            <p className="text-gray-600">
                                All our products undergo rigorous safety checks to ensure worry-free celebrations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gradient-to-b from-red-50 to-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Customers Say</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Don't just take our word for it - hear from our satisfied customers
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <TestimonialCard
                            name="Rajesh Kumar"
                            location="Chennai"
                            quote="The quality of fireworks from Vasantham Crackers is exceptional. My family was thrilled with our Diwali celebration this year!"
                            rating={5}
                            image="/placeholder.svg?height=60&width=60"
                        />
                        <TestimonialCard
                            name="Priya Sharma"
                            location="Coimbatore"
                            quote="Fast delivery and excellent product range. The gift box was perfect for my nephew's birthday celebration."
                            rating={5}
                            image="/placeholder.svg?height=60&width=60"
                        />
                        <TestimonialCard
                            name="Anand Patel"
                            location="Madurai"
                            quote="I've been buying from Vasantham for the past 5 years. Their consistent quality and service keeps me coming back."
                            rating={4}
                            image="/placeholder.svg?height=60&width=60"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-red-600 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to Light Up Your Celebration?
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            Browse our extensive collection of premium fireworks or download our latest pricelist
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href='/products'>
                                <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400">
                                    Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href='/PriceList.pdf' download>
                                <Button size="lg" variant="outline" className="border-white text-red-500">
                                    Download Pricelist <Download className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

