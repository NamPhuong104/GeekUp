import { useState } from 'react';
import { Layout, Button, theme, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Sidebar from '../home/Header';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Map route paths to page names
  const getPageName = (path) => {
    switch (path) {
      case '/customers':
        return 'Customers';
      case '/bank-accounts':
        return 'Bank Accounts';
      case '/cards':
        return 'Cards';
      case '/customer-segments':
        return 'Segments';
      case '/nice-accounts':
        return 'Nice Account Number';
      case '/bank-cards':
        return 'Bank Cards';
      case '/online-accounts':
        return 'Online Accounts';
      default:
        return 'Home'; // Default page name
    }
  };

  const pageName = getPageName(pathname);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{ marginLeft: collapsed ? 0 : 0 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Navigate to="/customers" />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Title level={3} style={{ margin: '0 16px' }}>
              {pageName}
            </Title>
          </div>
        </Header>
        <Layout style={{ padding: '24px 16px', background: colorBgContainer }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
