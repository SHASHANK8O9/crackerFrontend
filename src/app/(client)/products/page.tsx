import ProductPage from '@/components/products-page'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <div>
            <Suspense fallback={<div>Loading search...</div>}>
                <ProductPage />
            </Suspense>
        </div>
    )
}
