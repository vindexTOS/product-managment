import React, { useEffect, useState } from 'react'
import { Card, Tag, Row, Col, Image, Typography, Spin } from 'antd'
import { ImageType, Product, ProductMetaData } from '../types/product'
import Layout from '../Layouts/LayOut'
import { UseApiContext } from '@/Context/ApiContext'
import useSelection from 'antd/es/table/hooks/useSelection'
const { Title, Paragraph } = Typography

const ProductSinglePage: React.FC = () => {
  const { state, dispatch } = UseApiContext()
  const { isLoading } = state
  const product = state.productSingle
  const pathParts = window.location.pathname.split('/')
  const productId = pathParts[pathParts.length - 1]
  useEffect(() => {
    dispatch({ type: 'trigger_GetSingleProduct', payload: productId })
  }, [])
  if (isLoading) {
    return <Spin />
  }
  return (
    <Layout>
      <div style={{ padding: '20px' }} onClick={() => console.log(product)}>
        <Card
          hoverable
          cover={
            <Image
              style={{ width: '100%', height: 'auto' }}
              alt={product.name}
              src={product.images[0].url}
            />
          }
        >
          <Title level={2}>{product.name}</Title>
          <Paragraph>{product.description}</Paragraph>
          <Title level={4}>Price: {product.price}</Title>
          <Title level={4}>Categories:</Title>
          {product.product_meta_datas.map((metaData: ProductMetaData) => (
            <Tag key={metaData.id}>{metaData.category.name}</Tag>
          ))}
        </Card>

        <Title level={4} style={{ marginTop: '20px' }}>
          Photos
        </Title>
        <Row gutter={[16, 16]}>
          {product.images.map((image: ImageType) => (
            <Col key={image.id} xs={24} sm={12} md={8} lg={6}>
              <Image
                src={image.url}
                alt={product.name}
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  )
}

export default ProductSinglePage
