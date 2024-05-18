import React, { useState } from "react";
import { Form, Input, Button, Alert, Select } from "antd";
import axios from "axios";
import styles from "./styles/Register.module.css";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // Format the kids array with activities
      const formattedValues = {
        ...values,
        kids: values.kids.map((kid) => ({
          name: kid.name,
          activities: kid.activities.map((activity) => ({
            activityName: activity.activityName,
          })),
        })),
      };
  
      // Make API call to register user with formatted data
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formattedValues
      );
  
      // Handle successful registration
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        // Display success message and redirect to login page
        message.success("Registration successful. Please login.");
        navigate('/login'); // Assuming you have access to history object
      } else {
        // Display unexpected error message
        message.error("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network Error:", error);
      setErrorMessage("Network error occurred. Please try again later.");
    }
  };
  
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    console.log("Registration cancelled");
  };

  return (
    <div className={styles.container}>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <Form
        name="register"
        initialValues={{
          remember: true,
          parentFirstName: "",
          parentSurname: "",
          email: "",
          postalCode: "",
          homeAddress: "",
          phoneNumberParent1: "",
          phoneNumberParent2: "",
          password: "",
          kids: [{ name: "", activities: ["Football"] }],
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.customForm}
      >
        <Form.Item
          label="Parent's First Name"
          name="parentFirstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Parent's Surname"
          name="parentSurname"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Postal Code"
          name="postalCode"
          rules={[
            { required: true, message: "Please input your postal code!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Home Address"
          name="homeAddress"
          rules={[
            { required: true, message: "Please input your home address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Parent's Phone Number"
          name="phoneNumberParent1"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Second Parent's Phone Number"
          name="phoneNumberParent2"
          rules={[
            {
              required: true,
              message: "Please input your second parent's phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.List name="kids">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key}>
                  <h2>Kid {key + 1}</h2>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    fieldKey={[fieldKey, "name"]}
                    label={`Kid's Name`}
                    rules={[
                      { required: true, message: "Please input kid's name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.List name={[name, "activities"]}>
                    {(
                      activities,
                      { add: addActivity, remove: removeActivity }
                    ) => (
                      <>
                        {activities.map((activity, index) => (
                          <div key={activity.key}>
                            <Form.Item
                              label={`Activity ${index + 1}`}
                              name={[activity.name, "activityName"]}
                              fieldKey={[activity.fieldKey, "activityName"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please select an activity!",
                                },
                              ]}
                            >
                              <Select placeholder="Select activity">
                                <Option value="Football">Football</Option>
                                <Option value="Basketball">Basketball</Option>
                                <Option value="Volleyball">Volleyball</Option>
                                <Option value="Swimming">Swimming</Option>
                                <Option value="Guitar Lessons">
                                  Guitar Lessons
                                </Option>
                                <Option value="Piano Lessons">
                                  Piano Lessons
                                </Option>
                                <Option value="Drums Lessons">
                                  Drums Lessons
                                </Option>
                                <Option value="English Lessons">
                                  English Lessons
                                </Option>
                                <Option value="French Lessons">
                                  French Lessons
                                </Option>
                                <Option value="Spanish Lessons">
                                  Spanish Lessons
                                </Option>
                                <Option value="German Lessons">
                                  German Lessons
                                </Option>
                              </Select>
                            </Form.Item>

                            {index > 0 && (
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => removeActivity(activity.name)}
                                  block
                                >
                                  Remove activity
                                </Button>
                              </Form.Item>
                            )}
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addActivity()}
                            block
                          >
                            Add activity
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  {fields.length > 1 && (
                    <Form.Item>
                      <Button type="dashed" onClick={() => remove(name)} block>
                        Remove kid
                      </Button>
                    </Form.Item>
                  )}
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add kid
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <div className={styles.buttonWrap}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
      <div className={styles.link}>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
