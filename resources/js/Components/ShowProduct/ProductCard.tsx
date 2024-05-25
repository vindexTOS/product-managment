import React from 'react'
import { Button, Card, Tag } from 'antd'
import { Product } from '../../types/product'
import { UseApiContext } from '@/Context/ApiContext'
import { router } from '@inertiajs/react'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = UseApiContext()

  const navigateToProduct = (id: string) => {
    router.visit(`/product/${id}`)
  }
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          style={{ height: '300px' }}
          alt={product.name}
          src={product.images[0].url}
        />
      }
    >
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
        <Button style={{ backgroundColor: 'red', color: 'white' }}>
          Delete
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
