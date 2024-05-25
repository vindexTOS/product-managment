import { CategoryType } from '@/types/category'
import { Row, Col, Button, Modal, message, Pagination, Input, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { GetCategory, DeleteCategory } from '../../API/CategoryRequests'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
const { confirm } = Modal
export default function CategoryList() {
  const queryClient = useQueryClient()

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

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return DeleteCategory(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('category' as InvalidateQueryFilters)
    },
  })

  const onDelete = async (id: string) => {
    await mutation.mutateAsync(id)
  }
  const showDeleteConfirm = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      onOk() {
        onDelete(String(id))
      },
    })
  }
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
              onClick={() => showDeleteConfirm(String(val.id))}
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
