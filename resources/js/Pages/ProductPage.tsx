import React, { useEffect, useState } from 'react'
import { Card, Tag, Row, Col, Image, Typography, Spin } from 'antd'
import { ImageType, Product, ProductMetaData } from '../types/product'
import Layout from '../Layouts/LayOut'

import { useQuery } from '@tanstack/react-query'
import { GetSingleProduct } from '../API/ProductRequests'
const { Title, Paragraph } = Typography

const ProductSinglePage: React.FC = () => {
  const pathParts = window.location.pathname.split('/')
  const productId = pathParts[pathParts.length - 1]

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['product'],
    queryFn: () => GetSingleProduct(productId),
  })

  if (isPending) {
    return <Spin />
  }
  return (
    <Layout>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
        onClick={() => console.log(data)}
      >
        <Card
          hoverable
          style={{ width: '85%', height: 'auto' }}
          cover={
            <Image
              style={{ width: '100%', height: '700px' }}
              alt={data.name}
              src={data.images[0].url}
            />
          }
        >
          <Title level={2}>{data.name}</Title>
          <Paragraph>{data.description}</Paragraph>
          <Title level={4}>Price: {data.price}</Title>
          <Title level={4}>Categories:</Title>
          {data.product_meta_datas.map((metaData: ProductMetaData) => (
            <Tag key={metaData.id}>{metaData.category.name}</Tag>
          ))}
        </Card>

        <Title level={4} style={{ marginTop: '20px' }}>
          Photos
        </Title>
        <div style={{ width: '85%' }}>
          <Row gutter={[16, 16]}>
            {data.images.map((image: ImageType) => (
              <Col key={image.id} xs={24} sm={12} md={8} lg={6}>
                <Image
                  src={image.url}
                  alt={data.name}
                  style={{ width: '300px', height: '200px' }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default ProductSinglePage
