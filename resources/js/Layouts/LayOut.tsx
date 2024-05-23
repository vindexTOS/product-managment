import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { Footer } from 'antd/es/layout/layout'

const { Header, Sider, Content } = Layout

const LayoutComp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout className="w-100 h-100" style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 'Product',
              icon: <ProductOutlined />,
              label: 'Product',
            },
            {
              key: 'Admin Pannel',
              icon: <UserOutlined />,
              label: 'Admin Pannel',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Product Managment ©2024 Created by Giorgi Kutateladze
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutComp
