import React from 'react'
import { Button, Form, Input, message, Space, Spin } from 'antd'
import axios from 'axios'
import CategoryList from './CategoryList'
import { onSuccess, onError } from '../StatusHandler/Status'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { PostCategory } from '../../API/CategoryRequests'

export default function CreateCategory() {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (value: any) => {
      return PostCategory(value)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('category' as InvalidateQueryFilters)
    },
  })
  const onSubmit = async (values: any) => {
    await mutation.mutateAsync(values['new category'])
    mutation.reset()
    form.resetFields()
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
        {mutation.isPending && <Spin />}
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
      <CategoryList />
    </section>
  )
}
