"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import ProductCardSkeleton from "@/components/product-card-skeleton";

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // Get query params
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const category = searchParams.get("category");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}product?page=${page}&category=${category}&limit=${limit}`
            );
            setProducts(data?.data);
            setTotalPages(data?.pagination?.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    return (
        <div className="min-h-screen">
            {/* Category Heading */}
            <p className="text-2xl font-extrabold text-center text-red-600 uppercase p-2 border-b-2">
                Best Products
            </p>

            <div className="container mx-auto px-4 py-8">
                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[60vh]">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, idx) => (
                            <ProductCardSkeleton key={idx} />
                        ))
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} {...product} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No products found.
                        </p>
                    )}
                </div>

                {/* Pagination (uncomment when needed) */}
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
