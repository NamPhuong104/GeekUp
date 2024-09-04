import React from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, CrownOutlined, HeartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import {
  faBuildingColumns,
  faMoneyCheck,
} from '@fortawesome/free-solid-svg-icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case '/customers':
        return '1';
      case '/bank-accounts':
        return '2';
      case '/cards':
        return '3';
      case '/customer-segments':
        return '4';
      case '/nice-accounts':
        return '5';
      case '/online-accounts':
        return '6';
      default:
        return '1'; 
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      {/* <div className="demo-logo-vertical"></div> */}
      <div className="logo-container">
        <div className="logo-circle"></div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]} 
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
