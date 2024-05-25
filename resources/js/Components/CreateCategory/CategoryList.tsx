import { CategoryType } from '@/types/category'
import { Row, Col, Button, Pagination, Input } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { UseApiContext } from '@/Context/ApiContext'
import { useEffect } from 'react'

export default function CategoryList({ data }: { data: CategoryType[] }) {
  const { dispatch, state } = UseApiContext()

  const { categoryCurrentPage, categoryPageSize, categorySearch } = state

  const callQueryButton = () => {
    dispatch({
      type: 'triggere_GetCategory',
      payload: {
        page: categoryCurrentPage,
        perPage: categoryPageSize,
        search: categorySearch,
      },
    })
  }
  const handlePageChange = (page: number, pageSize?: number) => {
    dispatch({ type: 'set_category_current', payload: page })
    if (pageSize) {
      dispatch({ type: 'set_category_page_size', payload: pageSize })
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set_category_search', payload: e.target.value })
  }
  useEffect(() => {
    callQueryButton()
  }, [state.categoryCurrentPage, state.categoryPageSize])
  return (
    <div>
      <Input.Search
        placeholder="Search categories"
        value={state.categorySearch}
        onChange={handleSearch}
        style={{ marginBottom: '16px' }}
        onSearch={callQueryButton}
      />
      <Row gutter={[5, 5]} style={{ height: '200px', overflowY: 'scroll' }}>
        {state.categoryData.map((val: CategoryType) => (
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
        current={state.categoryCurrentPage}
        pageSize={state.categoryPageSize}
        total={state.categoryTotal}
        onChange={handlePageChange}
      />
    </div>
  )
}
