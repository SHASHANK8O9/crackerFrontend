"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import SearchCategoryFilter from "@/components/search-category-flter";

// Dummy product data
const products = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: "This is a sample product description.",
    price: Math.floor(Math.random() * 500) + 100,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 700) + 200 : undefined,
    rating: Math.floor(Math.random() * 5) + 1,
    reviewCount: Math.floor(Math.random() * 200),
    image: "/placeholder.svg?height=300&width=500",
    isNew: Math.random() > 0.7,
    limitedStock: Math.random() > 0.8,
    category: ["Firecracker", "Gadget", "Accessory"][Math.floor(Math.random() * 3)],
}));

export default function ProductListing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filtered products
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategory === "" || product.category === selectedCategory)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search and Filter Controls */}
            <SearchCategoryFilter />

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => <ProductCard key={product.id} {...product} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        Previous
                    </Button>
                    <span className="px-4 py-2 bg-gray-100 rounded">Page {currentPage} of {totalPages}</span>
                    <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
