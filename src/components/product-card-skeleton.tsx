import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="w-full max-w-xs rounded-lg border bg-white p-4 shadow-sm">
            {/* Discount Badge */}
            <div className="absolute top-2 left-2">
                <Skeleton className="h-5 w-14 rounded-md" />
            </div>

            {/* Image Placeholder */}
            <div className="relative flex h-40 w-full items-center justify-center rounded-lg bg-gray-100">
                <Skeleton className="h-full w-full rounded-lg" />
                <div className="absolute bottom-2">
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
            </div>

            {/* Category Tag */}
            <div className="mt-3">
                <Skeleton className="h-5 w-24 rounded-md" />
            </div>

            {/* Product Title */}
            <div className="mt-2">
                <Skeleton className="h-6 w-32 rounded-md" />
            </div>

            {/* Price Section */}
            <div className="mt-2 flex items-center space-x-2">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-5 w-10 rounded-md" />
            </div>

            {/* Add to Cart Button */}
            <div className="mt-3">
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
        </div>
    );
}
