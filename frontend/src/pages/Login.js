import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import styles from "./styles/Login.module.css";
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const Login = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const onFinish = async (values) => {
    try {
      let response;
      if (values.email === 'antony@gmail.com') {
        response = await axios.post('http://localhost:5000/api/admin/login', values);
        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
          navigate('/dashboard'); // Redirect to admin dashboard upon successful login
          return;
        }
      } else {
        response = await axios.post('http://localhost:5000/api/users/login', values);
      }
      
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to admin dashboard upon successful login

      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    console.log('Login cancelled');
  };

  return (
    <div className={styles.container}>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.customForm}
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
          <div className={styles.buttonWrap}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form.Item>

        {/* Link to Registration Form */}

      </Form>
      <Form.Item>
          <h1 className={styles.textforreg}>Don't have an account?<Link to="/registration" className={styles.linktext}>Register Now</Link></h1>
        </Form.Item>
    </div>
  );
};

export default Login;
