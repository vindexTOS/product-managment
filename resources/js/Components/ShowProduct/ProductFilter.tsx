import React, { useEffect, useState } from 'react'
import { Input, Checkbox, Button, Form, Select, Space, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { GetCategory } from '../../API/CategoryRequests'
import { CategoryType } from '@/types/category'

const { Search } = Input

const ProductFilter = ({ onFilter }: { onFilter: any }) => {
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    const categoriesParam = queryParams.get('categories')
    const searchParam = queryParams.get('search')
    if (searchParam) {
      setSearch(String(searchParam))
    }
    const newArr: any = categoriesParam?.split(',')

    setSelectedCategories(newArr)
  }, [])
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['category'],
    queryFn: () => GetCategory({ page: 1, perPage: 50, search: '' }),
  })

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleCategoryChange = (value: any) => {
    setSelectedCategories(value)
  }

  const handleSubmit = () => {
    onFilter({ search, categories: selectedCategories })
  }

  return (
    <Form
      style={{ paddingBottom: '5rem' }}
      layout="inline"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <Input
          placeholder="Search products"
          value={search}
          onChange={handleSearchChange}
          style={{ width: 200, marginBottom: 20 }}
        />
      </Form.Item>
      <Form.Item>
        {isCategoriesLoading ? (
          <Spin />
        ) : (
          <Select
            mode="multiple"
            allowClear
            style={{ width: '500px' }}
            placeholder="Please select categories"
            onChange={handleCategoryChange}
            options={categories.map((category: CategoryType) => ({
              value: category.name,
              label: category.name,
            }))}
            value={selectedCategories}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProductFilter
