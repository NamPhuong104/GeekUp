import React from 'react';
import { Menu, Layout } from 'antd'; // Import Layout from 'antd'
import { UserOutlined, CrownOutlined, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import {
  faBuildingColumns,
  faMoneyCheck,
} from '@fortawesome/free-solid-svg-icons';

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
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faBuildingColumns} />}>
          <Link to="/bank-accounts">Bank Accounts</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faMoneyCheck} />}>
          <Link to="/cards">Cards</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CrownOutlined />}>
          <Link to="/customer-segments">Segments</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<HeartOutlined />}>
          <Link to="/nice-accounts">Nice accounts</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FontAwesomeIcon icon={faAddressCard} />}>
          <Link to="/online-accounts">Online accounts</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
