import { UseApiContext } from '@/Context/ApiContext'
import React from 'react'
import { Product } from '../../types/product'
import ProductCard from './ProductCard'

export default function ProductList() {
  const { state, dispatch } = UseApiContext()

  return (
    <section style={{}}>
      <main style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {state.productData.map((val: Product) => {
          return <ProductCard product={val} />
        })}
      </main>
    </section>
  )
}
