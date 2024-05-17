import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onFinish = async (values) => {
    try {
      let response;
      if (values.email === 'antony@gmail.com') {
        // Admin login
        response = await axios.post('http://localhost:5000/api/admin/login', values);
      } else {
        // Regular user login
        response = await axios.post('http://localhost:5000/api/login', values);
      }
      
      if (response.data.admin && response.data.token) {
        // Admin login successful
        localStorage.setItem('adminToken', response.data.token);
        onLogin(); // Call the parent component's login handler
      } else if (response.data.user && response.data.token) {
        // Regular user login successful
        localStorage.setItem('userToken', response.data.token);
        onLogin(); // Call the parent component's login handler
      } else {
        // Handle error (e.g., invalid credentials)
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  
  
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    console.log('Login cancelled');
  };

  return (
    <div>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;