import { ArrowLeftOutlined, FileImageOutlined } from "@ant-design/icons"
import { Avatar, Breadcrumb, Card, Row, Table, Typography } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ActionButtons from "../../../global/ActionButtons"
import instances from "../../../plugin/axios"

function UserDetail() {
  const navigate = useNavigate()
  const { Text, Paragraph } = Typography
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const albumRes = await instances.get(`albums?_end=10&_start=0&userId=${id}`)
      setAlbum(albumRes.data)
      const userRes = await instances.get(`/users/${id}`)
      setUser(userRes.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsLoading(false)
    }
  }

  const handleModal = (modalType, value) => {
    if (modalType === "view" && value) {
      navigate(`/albums/${value.id}`)
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "5%",
      ellipsis: true
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "left",
      width: "40%",
      ellipsis: true
    },
    {
      title: "Actions",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return <ActionButtons record={record} handleViewModal={() => handleModal("view", record)} />
      }
    }
  ]

  return (
    <div>
      <Breadcrumb
        style={{ fontSize: 20 }}
        items={[
          {
            title: (
              <>
                <FileImageOutlined />
                <Link to="/users" style={{ marginLeft: 4, textDecoration: "none" }}>
                  Users
                </Link>
              </>
            )
          },
          {
            title: "Show"
          }
        ]}
      />
      <Paragraph>
        <Text style={{ fontSize: 30, fontWeight: "bold", display: "flex", alignContent: "center", justifyContent: "flex-start", gap: 10 }}>
          <Link to="/users">
            <ArrowLeftOutlined />
          </Link>
          <Text style={{ fontSize: 25 }}>Show Albums</Text>
        </Text>
      </Paragraph>

      <Card variant="borderless" style={{ width: "100%" }} loading={loading}>
        <Row style={{ marginBottom: 20 }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Link to={`/users/${user?.id}`}>
              <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=random`} />
            </Link>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontSize: "20px", fontWeight: "bold" }}>{user?.name}</Text>

              <a href={`mailto:${user?.email}`} target="_blank" rel="noopener noreferrer">
                {user?.email}
              </a>
            </div>
          </span>
        </Row>

        <Text style={{ fontSize: "20px", fontWeight: "bold" }}>Albums</Text>
        <Table columns={columns} dataSource={album} loading={loading} pagination={false} />
      </Card>
    </div>
  )
}

export default UserDetail
