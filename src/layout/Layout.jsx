import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Layout, theme, Typography } from "antd"
import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../home/Header"

const { Header } = Layout
const { Title } = Typography

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const getPageName = () => {
    if (location.pathname.startsWith("/albums")) return "Albums"
    if (location.pathname.startsWith("/users")) return "Users"
    return "Albums"
  }

  const pageName = getPageName()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{ marginLeft: collapsed ? 0 : 0 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64
              }}
            />
            <Title level={3} style={{ margin: "0 16px" }}>
              {pageName}
            </Title>
          </div>
        </Header>
        <Layout style={{ padding: "24px 16px", background: colorBgContainer }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutComponent
