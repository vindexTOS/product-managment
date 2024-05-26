import { Product } from '@/types/product'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { Button, Table, Tag, Modal, Spin } from 'antd'
import { router } from '@inertiajs/react'
import { DeleteProduct } from '../../API/ProductRequests'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

export default function ProductTable({
  data,
  isPending,
}: {
  data: Product[]
  isPending: boolean
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return DeleteProduct(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products' as InvalidateQueryFilters)
    },
  })
  const onDelete = async (id: string) => {
    await mutation.mutateAsync(id)
    mutation.reset()
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

  const navigateToProduct = (id: string) => {
    router.visit(`/product/${id}`)
  }
  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (images: any[]) => (
        <img
          alt="product"
          src={images[0]?.url}
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text: string, record: any) => (
      //   // <span >{text}</span>
      // ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) =>
        text.length >= 30 ? `${text.slice(0, 30)}...` : text,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Categories',
      key: 'categories',
      dataIndex: 'product_meta_datas',
      render: (productMetaDatas: any) => (
        <>
          {productMetaDatas.slice(0, 3).map((metaData: any) => (
            <Tag key={metaData.id}>{metaData.category.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <>
          <Button type="primary" onClick={() => navigateToProduct(record.id)}>
            Open
          </Button>
          <Button
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => showDeleteConfirm(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]
  return (
    <>
      {/* {isPending && <Spin />} */}
      <Table
        style={{ width: '100%', minHeight: '100vh' }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record: any) => record.id}
        loading={isPending}
      />
    </>
  )
}
