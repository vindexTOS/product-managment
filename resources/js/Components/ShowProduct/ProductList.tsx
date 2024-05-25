import { Product } from '../../types/product'
import ProductCard from './ProductCard'
import { useQuery } from '@tanstack/react-query'
import { GetProducts } from '../../API/ProductRequests'
import { Spin } from 'antd'

export default function ProductList() {
  const { data, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => GetProducts(),
  })

  if (isPending) {
    return <Spin />
  }
  if (data.length <= 0) {
    return <section>NO DATA</section>
  }
  return (
    <section style={{}}>
      <main style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {data.map((val: Product) => {
          return <ProductCard key={val.id} product={val} />
        })}
      </main>
    </section>
  )
}
