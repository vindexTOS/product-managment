import React from 'react'
import { Product } from '../../types/product'
import { router } from '@inertiajs/react'
import { Spin, Modal, Button, message, Card, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import defaultimage from '../../assets/default-product-image.png'

import { DeleteProduct } from '../../API/ProductRequests'
const { confirm } = Modal
interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigateToProduct = (id: string) => {
    router.visit(`/product/${id}`)
  }
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
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      onOk() {
        onDelete(String(product.id))
      },
    })
  }
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          style={{ height: '300px' }}
          alt={product.name}
          src={product.images[0].url ? product.images[0].url : defaultimage}
        />
      }
    >
      {mutation.isPending && <Spin />}
      <Card.Meta
        title={product.name}
        description={
          product.description.length > 30
            ? `${product.description.slice(0, 30)}...`
            : product.description
        }
      />
      <p>Price: {product.price}</p>
      {product.product_meta_datas.slice(0, 5).map((metaData, index: number) => {
        return <Tag key={metaData.id}>{metaData.category.name}</Tag>
      })}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Button
          onClick={() => navigateToProduct(String(product.id))}
          type="primary"
          style={{ marginRight: '8px' }}
        >
          Open
        </Button>
        <Button
          onClick={showDeleteConfirm}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          Delete
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
