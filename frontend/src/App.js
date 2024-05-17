import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPageOverview from './pages/MainPageOverview';
import Login from './pages/Login';
import Maps from './pages/Maps';
import Plans from './pages/Plans';
import Partners from './pages/Partners';
import UserDashboard from './pages/UserDashboard';
import BookNow from './pages/BookNow';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  GlobalOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import schoolLogo from './assets/bus.png';

import './App.css'; // Import App.css file

const { Sider, Content } = Layout;
const { Item } = Menu;

const items = [
  { key: 'home', label: 'Home', icon: <HomeOutlined />, path: '/' },
  { key: 'maps', label: 'Maps', icon: <GlobalOutlined />, path: '/maps' },
  { key: 'plans', label: 'Plans', icon: <ProjectOutlined />, path: '/plans' },
  { key: 'partners', label: 'Partners', icon: <UsergroupAddOutlined />, path: '/partners' },
  { key: 'user-dashboard', label: 'User Dashboard', icon: <DashboardOutlined />, path: '/user-dashboard' },
  { key: 'book-now', label: 'Book Now', icon: <CalendarOutlined />, path: '/book-now' },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Function to handle login event
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout event
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ width: '100%' }}>
          <div className="logo">
            <img src={schoolLogo} alt="School Logo" style={{ width: '100%', height: 'auto' }} />
          </div>
          <Menu theme="dark" mode="inline" >
            {/* Render sidebar menu items */}
            {items.map(item => (
              <Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Item>
            ))}
            {/* Conditional rendering of login button */}
            {!isLoggedIn && (
              <Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Content className="content">
            <Routes>
              {/* Define routes for other pages */}
              <Route exact path="/" element={<MainPageOverview />} />
              <Route exact path="/maps" element={<Maps />} />
              <Route exact path="/plans" element={<Plans />} />
              <Route exact path="/partners" element={<Partners />} />
              <Route exact path="/user-dashboard" element={<UserDashboard />} />
              <Route exact path="/book-now" element={<BookNow />} />
              {/* Render Login component with handleLogin function */}
              <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}


export default App;
