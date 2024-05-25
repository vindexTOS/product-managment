import React, { useState } from 'react'

import { Button, DatePicker, Form, Input, Select, Space, Spin } from 'antd'
import { UseApiContext } from '@/Context/ApiContext'
import { onSuccess, onError } from '../StatusHandler/Status'
import axios from 'axios'
import ImageUpload from './ImageUpload'
const { TextArea } = Input

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const CreateForm: React.FC = () => {
  const { state, dispatch } = UseApiContext()
  const [isLoading, setLoading] = useState(false)
  const [resetImage, setReSetImage] = useState(false)
  const [categories, setCategories] = useState<any>([])

  const [form] = Form.useForm()

  const CreateNewProduct = async (value: any) => {
    setLoading(true)
    const formData = new FormData()

    formData.append('name', value.name)
    formData.append('price', value.price)
    formData.append('description', value.description)
    formData.append('categories', JSON.stringify(categories))

    state.UploadFile.forEach((file: any, index: number) => {
      formData.append(`images[${index}]`, file.originFileObj)
    })

    try {
      const response = await axios.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      form.resetFields()
      setCategories([])
      setLoading(false)
      setReSetImage(true)
      onSuccess(response.data.message)
    } catch (error) {
      setLoading(false)
      const err: any = error
      console.error('Error:', err.response.data)
    }
  }
  const rules: any[] = [
    { required: true },
    { type: 'string', warningOnly: true },
    { type: 'string', min: 1 },
  ]

  const pushCategories = (selectedIds: any) => {
    const selectedCategories = selectedIds.map((id: any) => {
      const category: any = state.categoryData.find((item) => item.id === id)
      return { id: category.id, name: category.name }
    })
    setCategories(selectedCategories)
  }

  return (
    <section
      style={{
        width: '50%',
        backgroundColor: '#EDEDED',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <h1 style={{ fontSize: '2rem' }}>Create New Product</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        autoComplete="off"
        style={{ maxWidth: 600 }}
        onFinish={CreateNewProduct}
      >
        {isLoading && <Spin />}
        <Form.Item name="name" label="name" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="price" rules={rules}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="category">
          <Space style={{ width: '100%' }} direction="vertical">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={categories.map((category: any) => category.id)}
              onChange={pushCategories}
              options={state.categoryData.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </Space>
        </Form.Item>

        <Form.Item rules={rules} label="description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          rules={rules}
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <ImageUpload reset={resetImage} />
        </Form.Item>
        <Form.Item label="Button">
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </section>
  )
}

export default CreateForm
