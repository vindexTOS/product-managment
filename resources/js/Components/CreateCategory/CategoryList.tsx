import { CategoryType } from '@/types/category'
import { Row, Col, Button, Pagination, Input, Spin } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { GetCategory } from '../../API/CategoryRequests'
import { useQuery } from '@tanstack/react-query'

export default function CategoryList() {
  const [query, setQuery] = useState({
    page: 1,
    perPage: 50,
    search: '',
    searchTerm: '',
  })
  const { page, perPage, search, searchTerm } = query
  const { data, isPending } = useQuery({
    queryKey: ['category', search, perPage, search],
    queryFn: () =>
      GetCategory({
        page,
        perPage,
        search,
      }),
  })

  const handlePageChange = (page: number, pageSize?: number) => {
    setQuery((prevQuery) => ({ ...prevQuery, page }))
    if (pageSize) {
      setQuery((prevQuery) => ({ ...prevQuery, pageSize }))
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prevQuery) => ({ ...prevQuery, searchTerm: e.target.value }))
  }

  const handleSearchButton = () => {
    setQuery((prevQuery) => ({ ...prevQuery, search: searchTerm }))
  }
  if (isPending) {
    return <Spin />
  }
  return (
    <div>
      <Input.Search
        placeholder="Search categories"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '16px' }}
        onSearch={handleSearchButton}
      />
      <Row
        onClick={() => {
          console.log(data)
        }}
        gutter={[5, 5]}
        style={{ height: '200px', overflowY: 'scroll' }}
      >
        {data?.map((val: CategoryType) => (
          <Col
            key={val.id}
            span={24}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flexGrow: 1 }}>{val.name}</div>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              //   onClick={() => handleDelete(val.id)}
            >
              Delete
            </Button>
          </Col>
        ))}
      </Row>
      <Pagination
        current={page}
        pageSize={perPage}
        total={10}
        onChange={handlePageChange}
      />
    </div>
  )
}
