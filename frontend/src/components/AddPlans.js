<<<<<<< HEAD
import React, { useState } from 'react';
import './styles/AddPlan.css'; // Import CSS file

const AddPlans = ({ onSubmit }) => {
  const [userId, setUserId] = useState('');
  const [availableRoutes, setAvailableRoutes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('availableRoutes', availableRoutes);
    onSubmit(formData);
  };

  return (
    <div className="container"> {/* Added container class */}
      <h2 className="heading">Add User Plan</h2> {/* Added heading class */}
      <form onSubmit={handleSubmit} className="customForm"> {/* Added customForm class */}
        <label className="formLabel"> {/* Added formLabel class */}
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="formInput" /> {/* Added formInput class */}
        </label>
        <label className="formLabel"> {/* Added formLabel class */}
          Available Routes:
          <input type="number" value={availableRoutes} onChange={(e) => setAvailableRoutes(e.target.value)} className="formInput" /> {/* Added formInput class */}
        </label>
        <button type="submit" className="submitButton">Submit</button> {/* Added submitButton class */}
      </form>
=======
import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import styles from './styles/AddPlan.module.css'; // Assuming you have this CSS file

const { Option } = Select;

const AddPlans = () => {
  const [form] = Form.useForm();

// Modify the handleSubmit function in AddPlans.js

const handleSubmit = async (values) => {
  try {
    if (!values.activities || values.activities.length === 0) {
      message.error("Please add at least one activity.");
      return;
    }

    // Make API call to submit the form data
    const response = await axios.post('http://localhost:5000/api/plans/import', { plans: [values] });

    if (response.status === 201) {
      message.success("Plans imported successfully");
      form.resetFields(); // Reset the form fields after successful submission
    } else {
      message.error("An unexpected error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Submission Error:", error);
    message.error("Submission failed. Please try again.");
  }
};

  

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add User Plan</h2>
      <Form
        form={form}
        name="add_plan"
        onFinish={handleSubmit}
        className={styles.customForm}
        initialValues={{
          availableRoutes: '',
          availableSeats: '',
          price: '',
          plantittle: '',
          plandescription:'',
          activities: [{ activity: 'Football' }]
        }}
      >
        <Form.Item
          label="Plan Title"
          name="title"
          rules={[{ required: true, message: 'Please input the plan title!' }]}
        >
          <Input className={styles.formInput} />
        </Form.Item>
        <Form.Item
          label="Available Routes"
          name="availableRoutes"
          rules={[{ required: true, message: 'Please input the available routes!' }]}
        >
          <Input type="number" className={styles.formInput} />
        </Form.Item>

        <Form.Item
          label="Available Seats"
          name="availableSeats"
          rules={[{ required: true, message: 'Please input the available seats!' }]}
        >
          <Input type="number" className={styles.formInput} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input type="number" className={styles.formInput} />
        </Form.Item>
        <Form.Item
            label="Plan Description"
            name="description"
            rules={[{ required: true, message: 'Please input the plan description!' }]}
          >
            <Input.TextArea rows={4} className={styles.formInput} />
          </Form.Item>

        <Form.List name="activities">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key}>
                  <Form.Item
                    {...restField}
                    label="Activity"
                    name={[name, 'activity']}
                    fieldKey={[fieldKey, 'activity']}
                    rules={[{ required: true, message: 'Please select an activity!' }]}
                  >
                    <Select placeholder="Select activity">
                      {/* Sports Activities */}
                      <Option value="Football">Football</Option>
                      <Option value="Basketball">Basketball</Option>
                      <Option value="Volleyball">Volleyball</Option>
                      <Option value="Swimming">Swimming</Option>
                      {/* Music Classes */}
                      <Option value="Guitar Lessons">Guitar Lessons</Option>
                      <Option value="Piano Lessons">Piano Lessons</Option>
                      <Option value="Drums Lessons">Drums Lessons</Option>
                      {/* Foreign Language Lessons */}
                      <Option value="English Lessons">English Lessons</Option>
                      <Option value="French Lessons">French Lessons</Option>
                      <Option value="Spanish Lessons">Spanish Lessons</Option>
                      <Option value="German Lessons">German Lessons</Option>
                    </Select>
                  </Form.Item>
                  {fields.length > 1 && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        block
                      >
                        Remove Activity
                      </Button>
                    </Form.Item>
                  )}
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Activity
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div className={styles.buttonWrap}>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            Submit
          </Button>
        </Form.Item>
        </div>
      </Form>
      
>>>>>>> 27e970e3 (New release)
    </div>
  );
};

export default AddPlans;
