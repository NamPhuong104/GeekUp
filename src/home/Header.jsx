import { FileImageOutlined, UserOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const { Sider } = Layout

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const albumDetailMatch = location.pathname.match(/^\/albums\/([^/]+)$/)
    const userDetailMatch = location.pathname.match(/^\/users\/([^/]+)$/)

    if (albumDetailMatch) {
      document.title = `#${albumDetailMatch[1]} Show Album | Phuong`
    } else if (userDetailMatch) {
      document.title = `#${userDetailMatch[1]} Show User | Phuong`
    } else if (location.pathname.startsWith("/albums")) {
      document.title = "Albums | Phuong"
    } else if (location.pathname.startsWith("/users")) {
      document.title = "Users | Phuong"
    }
  }, [location.pathname])

  const getSelectedKey = () => {
    if (location.pathname.startsWith("/albums")) return "1"
    if (location.pathname.startsWith("/users")) return "2"
    return "1"
  }

  const menuItems = [
    {
      key: "1",
      icon: <FileImageOutlined />,
      label: <Link to="/albums">Albums</Link>
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>
    }
  ]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div className="logo-container" onClick={() => navigate("/albums")}>
        <div className="logo-circle" style={{ padding: collapsed && 0 }}>
          <img src="/geekup-logo.svg" alt="Logo GeekUp" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <Menu mode="inline" selectedKeys={[getSelectedKey()]} key={getSelectedKey()} items={menuItems} />
    </Sider>
  )
}

export default Sidebar
