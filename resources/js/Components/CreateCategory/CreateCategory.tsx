import React from 'react'
import { Button, Form, Input, message, Space } from 'antd'
import axios from 'axios'
import { UseApiContext } from '@/Context/ApiContext'
import CategoryList from './CategoryList'
import { onSuccess, onError } from '../StatusHandler/Status'

export default function CreateCategory() {
  const [form] = Form.useForm()
  const { state, dispatch } = UseApiContext()
  const onSubmit = async (values: any) => {
    axios
      .post('/api/category', { category: values['new category'] })
      .then((response) => {
        onSuccess(response.data.message)
        form.resetFields()
        dispatch({
          type: 'triggere_GetCategory',
          payload: {
            page: 1,
            perPage: 5,
            search: '',
          },
        })
      })
      .catch((error) => {
        onError(error.response.data.message)
      })
  }

  return (
    <section
      style={{
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
      }}
    >
      <h1 style={{ fontSize: '2rem' }}>Create New Category</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="new category"
          label="new category"
          rules={[
            { required: true },
            { type: 'string', warningOnly: true },
            { type: 'string', min: 3 },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Submit">
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <CategoryList data={state.categoryData} />
    </section>
  )
}
