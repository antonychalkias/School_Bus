import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPageOverview from './pages/MainPageOverview';
import Login from './pages/Login';
import Maps from './pages/Maps';
import Plans from './pages/Plans';
import Partners from './pages/Partners';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookNow from './pages/BookNow';
import Register from './pages/Registration';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  GlobalOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
  CalendarOutlined,
  LoginOutlined,
  LogoutOutlined
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
  { key: 'book-now', label: 'Book Now', icon: <CalendarOutlined />, path: '/book-now' },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    // Check if either user token or admin token exists in localStorage
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    if (userToken || adminToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    // Redirect to main page
  };

  // Determine the dashboard to render based on token
  const Dashboard = () => {
    // Check if adminToken exists in localStorage
    const adminToken = localStorage.getItem('adminToken');

    // Render AdminDashboard if adminToken exists, otherwise render UserDashboard
    return adminToken ? <AdminDashboard /> : <UserDashboard />;
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ width: '100%' }}>
          <div className="logo">
            <img src={schoolLogo} alt="School Logo" style={{ width: '100%', height: 'auto' }} />
          </div>
          <Menu theme="dark" mode="inline">
            {/* Render sidebar menu items */}
            {items.map(item => (
              <Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Item>
            ))}
            {/* Only render the Dashboard route if user is logged in */}
            {isLoggedIn && (
              <Item key="dashboard" icon={<DashboardOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
              </Item>
            )}
            {/* Conditional rendering of login/logout button */}
            {!isLoggedIn ? (
              <Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            ) : (
              <Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
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
              {/* Route to the Dashboard */}
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/book-now" element={<BookNow />} />
              {/* Render Login component */}
              <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/registration" element={<Register />} /> {/* Define route for Registration Form */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

