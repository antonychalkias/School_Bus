import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import AddBus from '../components/AddBus';
import AddPoint from '../components/AddPoint';
import AddPlans from '../components/AddPlans';
<<<<<<< HEAD
=======
import EditPlans from '../components/EditPlans'; // Import the EditPlans component
>>>>>>> 27e970e3 (New release)

const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleAddBusClick = () => {
    setActiveForm('bus');
  };
  
  const handleAddUserPlanClick = () => {
    setActiveForm('userPlan');
  };
  
  const handleAddMapPointClick = () => {
    setActiveForm('mapPoint');
  };
<<<<<<< HEAD

=======
  const handleEditPlansClick = () => {
    setActiveForm('editPlans');
  };
  
>>>>>>> 27e970e3 (New release)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
      <div style={{ margin: '30px' }}>
        <h1>Admin Dashboard</h1>
        <Space size={[16, 16]} wrap>
          {/* Button for adding a new bus */}
          <Button type="primary" shape="square" size="large" icon={<PlusOutlined />} onClick={handleAddBusClick} style={{ backgroundColor: '#001529' }}>
            Add Bus
          </Button>
          
          {/* Button for adding a new user plan */}
          <Button type="primary" shape="square" size="large" icon={<UserOutlined />} onClick={handleAddUserPlanClick} style={{ backgroundColor: '#001529' }}>
            Add User Plan
          </Button>
          
          {/* Button for adding a new map point */}
          <Button type="primary" shape="square" size="large" icon={<EnvironmentOutlined />} onClick={handleAddMapPointClick} style={{ backgroundColor: '#001529' }}>
            Add Map Point
          </Button>
<<<<<<< HEAD
=======

          <Button type="primary" shape="square" size="large" onClick={handleEditPlansClick} style={{ backgroundColor: '#001529' }}>
            Edit Plans
          </Button>

>>>>>>> 27e970e3 (New release)
        </Space>
        {/* Render active form based on state */}
        {activeForm === 'bus' && <AddBus />}
        {activeForm === 'userPlan' && <AddPlans />}
        {activeForm === 'mapPoint' && <AddPoint />}
<<<<<<< HEAD
=======
        {activeForm === 'editPlans' && <EditPlans />}
>>>>>>> 27e970e3 (New release)
      </div>
    </div>
  );
};

export default AdminDashboard;
