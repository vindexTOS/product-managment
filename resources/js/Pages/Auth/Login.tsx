import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import axios from 'axios'

export default function Login() {
  const onFinish = (values: any) => {
    console.log(values)
    axios
      .post('/login', values)
      .then((response) => {
        window.location.href = '/admin'
      })
      .catch((error) => {
        console.error('Error:', error.response.data)
      })
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <h1>შეიყვანეთ ადმინის მეილი და პაროლი</h1>
        <p>email: admin@gmail.com</p>
        <p>password: 1234</p>
      </div>
      <Form
        style={{
          backgroundColor: '#d3d3d3',
          padding: '10px',
          borderRadius: '20px',
        }}
        name="normal_login "
        className="login-form   w-[30%] "
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
