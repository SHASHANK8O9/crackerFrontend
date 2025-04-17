import HomePage from '@/components/home-page'
import Loading from '@/components/loading-page'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <HomePage />
    </Suspense>
  )
}
