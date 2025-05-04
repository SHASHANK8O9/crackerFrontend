"use client";
import Pagination from '@/components/pagination';
import ProductCard from '@/components/product-card';
import ProductCardSkeleton from '@/components/product-card-skeleton';
import SearchCategoryFilter from '@/components/search-category-flter';
import { Product } from '@/lib/data';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)

    const [totalPages, setTotalPages] = useState(1);
    // ✅ Always get values dynamically from searchParams
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product?page=${page}&cat=${category}&limit=${limit}`);
            console.log(data)
            setProducts(data?.data);
            setTotalPages(data?.pagination?.totalPages);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products")
            setLoading(false)
            // Handle error (e.g., show toast notification)
        }
    }
    useEffect(() => {
        fetchProducts()
        console.log(page, search, category, limit)
    }, [searchParams])

    return (
        <div className='h-screen'>
            <p className='text-2xl font-extrabold text-center text-red-600 uppercase p-2 border-b-2'>
                {category}
            </p>

            <div className="container min-h-screen mx-auto px-4 py-8">
                {/* Search and Filter Controls */}
                {/* <SearchCategoryFilter /> */}

                {/* Product Grid */}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[60vh]">
                    {loading ? Array.from({ length: 8 })?.map(_ => {
                        return <ProductCardSkeleton />
                    }) : products?.length > 0 ? (
                        products.map((product) => <ProductCard key={product?._id} {...product} />)
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No products found.</p>
                    )}
                </div>

                {/* Pagination */}
                {/* <Pagination totalPages={Number(totalPages)} /> */}

            </div>

        </div>
    )
}






