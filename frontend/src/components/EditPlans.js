import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popconfirm, message, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditPlans = ({ fetchPlans }) => {
  const [plans, setPlans] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Fetch plans when component mounts
  useEffect(() => {
    fetchPlansData();
  }, []);

  const fetchPlansData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      message.error('Failed to fetch plans. Please try again.');
    }
  };

  // Columns for the plans table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Available Routes',
      dataIndex: 'availableRoutes',
      key: 'availableRoutes',
    },
    {
      title: 'Available Seats',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          {/* Edit Plan Button */}
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditPlan(record)} />

          {/* Delete Plan Button */}
          <Popconfirm
            title="Are you sure you want to delete this plan?"
            onConfirm={() => handleDeletePlan(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Function to handle editing a plan
  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setEditModalVisible(true);
  };

  // Function to handle deleting a plan
  const handleDeletePlan = async (planId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/plans/${planId}`);
      if (response.status === 200) {
        message.success('Plan deleted successfully');
        fetchPlans(); // Refresh plans after deletion
      } else {
        message.error('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      message.error('Failed to delete plan. Please try again.');
    }
  };

  // Function to handle editing plan form submission
  const handleEditPlanFormSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/plans/${editingPlan._id}`, values);
      if (response.status === 200) {
        message.success('Plan updated successfully');
        setEditModalVisible(false);
        fetchPlans(); // Refresh plans after editing
      } else {
        message.error('Failed to update plan');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      message.error('Failed to update plan. Please try again.');
    }
  };
  

  return (
    <>
      <Table dataSource={plans} columns={columns} />

      {/* Edit Plan Modal */}
      <Modal
        title="Edit Plan"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            title: editingPlan?.title,
            availableRoutes: editingPlan?.availableRoutes,
            availableSeats: editingPlan?.availableSeats,
            price: editingPlan?.price,
          }}
          onFinish={handleEditPlanFormSubmit}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Available Routes" name="availableRoutes">
            <Input />
          </Form.Item>
          <Form.Item label="Available Seats" name="availableSeats">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditPlans;
