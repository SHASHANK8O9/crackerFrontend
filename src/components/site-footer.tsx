"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export default function SiteFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        {/* src="/placeholder.svg?height=50&width=200" */}
                        <Link href="/" className="flex items-center">
                            <Image

                                src={`/LogoC.jpg`}
                                alt="Vasantham Crackers World"
                                width={40}
                                height={40}
                                className="w-auto"
                            />
                        </Link>
                        <p className="mb-6 text-gray-400">
                            A reputed and reliable name in the field of Fireworks trading business for past 10 years, offering quality
                            products at competitive prices.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="WhatsApp" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.984-.273-.116-.472-.176-.698.129-.226.305-.866.984-1.062 1.185-.196.2-.392.225-.689.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.3-.347.448-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.698-1.681-.954-2.302-.255-.621-.51-.51-.698-.51-.19 0-.411-.025-.634-.025-.223 0-.587.074-.893.372-.307.297-1.173 1.146-1.173 2.796s1.198 3.242 1.371 3.466c.173.223 2.39 3.879 5.892 5.292 3.501 1.413 3.501.942 4.132.884.63-.058 2.033-.83 2.321-1.63.287-.8.287-1.485.212-1.632-.075-.147-.273-.223-.57-.371z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153A4.897 4.897 0 0 1 7.45 2.525c.638-.248 1.362-.415 2.428-.465C10.944 2.013 11.283 2 12 2z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Google Maps" className="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.9 4.8C17.2 3 14.9 2 12.5 2c-4.7 0-8.5 3.8-8.5 8.5 0 4.7 8.5 11.5 8.5 11.5s8.5-6.8 8.5-11.5c0-2.4-1-4.7-2.8-6.4zm-6.4 9.9c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-white">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/price-list" className="hover:text-white">
                                    Price List
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/gift-box" className="hover:text-white">
                                    Gift Box
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-white">Products</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/categories/sparklers" className="hover:text-white">
                                    Sparklers
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/ground-chakkar" className="hover:text-white">
                                    Ground Chakkar
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/rockets" className="hover:text-white">
                                    Rockets
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/flower-pots" className="hover:text-white">
                                    Flower Pots
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/atom-bombs" className="hover:text-white">
                                    Atom Bombs
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/gift-boxes" className="hover:text-white">
                                    Gift Boxes
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="mr-3 h-5 w-5 shrink-0 text-red-500" />
                                <span>216, Servaikaranpatty Post, Gujiliamparai, Dindigul- 624620</span>
                            </li>

                            <li className="flex items-center">
                                <Phone className="mr-3 h-5 w-5 shrink-0 text-red-500" />
                                <a href="tel:+919092780866" className="hover:text-white">
                                    +91 6380544276
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-3 h-5 w-5 shrink-0 text-red-500" />
                                <a href="mailto:nammapettikdai@gmail.com " className="hover:text-white">
                                    nammapettikdai@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center">
                    <p>© {new Date().getFullYear()} Nammapettikdai. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

