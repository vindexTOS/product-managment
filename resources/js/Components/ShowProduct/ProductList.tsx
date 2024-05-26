import { Product } from '../../types/product'
import ProductCard from './ProductCard'
import { useQuery } from '@tanstack/react-query'
import { GetProducts } from '../../API/ProductRequests'
import { Button, Pagination, Spin } from 'antd'
import { useEffect, useState } from 'react'
import ProductFilter from './ProductFilter'
import ProductTable from './ProductTable'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(12)

  const [search, setSearch] = useState('')
  const [tableSwitcher, setTableSwitcher] = useState('Switch To Cards')
  const [categories, setCategories] = useState<any>([])
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('desc')
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    const pageParam = queryParams.get('page')
    const perPageParam = queryParams.get('perPage')
    const searchParam = queryParams.get('search')
    const categoriesParam = queryParams.get('categories')
    const priceParam = queryParams.get('price')
    const dateParam = queryParams.get('date')
    console.log(pageParam)
    setPage(pageParam ? parseInt(pageParam) : 1)
    setPerPage(perPageParam ? parseInt(perPageParam) : 10)
    setSearch(searchParam || '')
    setCategories(categoriesParam ? categoriesParam.split(',') : [])
    setPrice(priceParam || '')
    setDate(dateParam || 'desc')
    //
    const savedTableSwitcher = localStorage.getItem('tableSwitcher')
    if (savedTableSwitcher) {
      setTableSwitcher(savedTableSwitcher)
    }
  }, [])
  useEffect(() => {
    const queryParams = new URLSearchParams()

    queryParams.set('page', String(page))
    queryParams.set('perPage', String(perPage))
    queryParams.set('search', search)
    queryParams.set('price', price)
    queryParams.set('date', date)
    if (categories && categories.length > 0 && categories[0] !== 'undefiend') {
      queryParams.set('categories', categories?.join(','))
    }

    window.history.pushState({}, '', `/products?${String(queryParams)}`)
  }, [page, perPage, search, categories])
  const { data, isPending } = useQuery({
    queryKey: ['products', page, perPage, search, categories, price, date],
    queryFn: () => GetProducts(page, perPage, search, categories, price, date),
  })

  const handleFilter = (filterParams: any) => {
    console.log(page, perPage, search, categories, price, date)
    // console.log('triggered')
    setSearch(filterParams.search)
    setCategories(filterParams.categories)
    setPrice(filterParams.price)
    setDate(filterParams.date)
    setPage(1)
  }

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page)
    setPerPage(pageSize)
  }

  const SwitchLayOut = () => {
    if (tableSwitcher == 'Switch To Cards') {
      localStorage.setItem('tableSwitcher', 'Switch To Table')

      setTableSwitcher('Switch To Table')
    } else if (tableSwitcher == 'Switch To Table') {
      localStorage.setItem('tableSwitcher', 'Switch To Cards')

      setTableSwitcher('Switch To Cards')
    }
  }
  if (data?.data.length <= 0) {
    return <section>NO DATA</section>
  }

  return (
    <section>
      <ProductFilter onFilter={handleFilter} />
      <Button type="primary" onClick={() => SwitchLayOut()}>
        {tableSwitcher}
      </Button>

      {isPending && <Spin />}
      <main
        style={{
          paddingTop: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          marginLeft: '50px',
        }}
      >
        {tableSwitcher !== 'Switch To Table' ? (
          <ProductTable data={data?.data.data} isPending={isPending} />
        ) : (
          <>
            {data?.data.data.map((val: Product) => (
              <ProductCard key={val.id} product={val} />
            ))}
          </>
        )}
      </main>
      <Pagination
        current={Number(page)}
        total={data?.data?.total}
        pageSize={Number(perPage)}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </section>
  )
}
