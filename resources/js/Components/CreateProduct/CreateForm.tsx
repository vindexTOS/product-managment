import React, { useState } from 'react'

import { Button, Form, Input, Select, Space, Spin } from 'antd'
import { UseFileContext } from '@/Context/FileContext'
import { onError } from '../StatusHandler/Status'
import ImageUpload from './ImageUpload'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PostProduct } from '../..//API/ProductRequests'
import { GetCategory } from '../../API/CategoryRequests'
import { CategoryType } from '../../types/category'

const { TextArea } = Input

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const CreateForm: React.FC = () => {
  const { state } = UseFileContext()
  const [resetImage, setReSetImage] = useState(false)
  const [categories, setCategories] = useState<any>([])
  const { data, isPending } = useQuery({
    queryKey: ['category'],
    queryFn: () => GetCategory({ page: 1, perPage: 50, search: '' }),
  })

  const [form] = Form.useForm()
  const mutation = useMutation({
    mutationFn: (value: any) => {
      return PostProduct(value)
    },
  })
  const CreateNewProduct = async (value: any) => {
    if (categories.length <= 0) {
      onError('please add atleast one category')
      return
    }

    if (state.UploadFile.length <= 0) {
      onError('please add atleast one image')
      return
    }
    const formData = new FormData()
    formData.append('name', value.name)
    formData.append('price', value.price)
    formData.append('description', value.description)
    formData.append('categories', JSON.stringify(categories))
    state.UploadFile.forEach((file: any, index: number) => {
      formData.append(`images[${index}]`, file.originFileObj)
    })

    await mutation.mutateAsync(formData)
    mutation.reset()
    form.resetFields()
    setReSetImage(true)
  }
  //
  const rules: any[] = [
    { required: true },
    { type: 'string', warningOnly: true },
    { type: 'string', min: 1 },
  ]

  const pushCategories = (selectedIds: any) => {
    const selectedCategories = selectedIds.map((id: any) => {
      const category: any = data.find((item: CategoryType) => item.id === id)
      return { id: category.id, name: category.name }
    })
    setCategories(selectedCategories)
  }
  if (!isPending) {
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
          {mutation.isPending && <Spin />}
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
                options={data.map((category: { id: number; name: string }) => ({
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
}

export default CreateForm
