import React from 'react';
import { Menu, Layout } from 'antd'; // Import Layout from 'antd'
import { UserOutlined, CreditCardOutlined, BankOutlined, CrownOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout; // Destructure Sider from Layout

const Sidebar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />}>
          <Link to="/bank-accounts">Bank Accounts</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CreditCardOutlined />}>
          <Link to="/cards">Cards</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CrownOutlined />}>
          <Link to="/customer-segments">Segments</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<HeartOutlined />}>
          <Link to="/nice-accounts">Nice accounts</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TeamOutlined />}>
          <Link to="/online-accounts">Online accounts</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
