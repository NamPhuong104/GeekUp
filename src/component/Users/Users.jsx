import { Avatar, Col, message, notification, Row, Table } from "antd"
import ActionButtons from "../../global/ActionButtons"
import instances from "../../plugin/axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../../page/Loading"

const dataSource = [
  {
    key: "1",
    bankAccountNumber: "11111111111",
    name: "Nguyen Nam Phuong",
    customerSegmentType: "Ưu tiên",
    citizenIdentification: "0123456789"
  },
  {
    key: "2",
    bankAccountNumber: "11111111111",
    name: "Nguyen Nam Phuong",
    customerSegmentType: "Ưu tiên",
    citizenIdentification: "0123456789"
  }
]
function Users() {
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState([])
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])
  const fetchUserData = async () => {
    setIsLoading(true)
    try {
      const res = await instances("/users")
      setUsersData(res.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      notification.error({ message: "Fail to fetch data", description: error.message || "Something went wrong!" })
      setIsLoading(false)
    }
  }

  const handleModal = (modalType, value) => {
    if (modalType === "view" && value) {
      navigate(`/users/${value.id}`)
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
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: "10%",
      ellipsis: true,
      render: (_, record) => {
        return (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.name)}&background=random`} />
          </span>
        )
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ellipsis: true
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: "15%",
      ellipsis: true,
      render: (_, record) => {
        return (
          <a href={`mailto:${record?.email}`} style={{ textDecoration: "none" }}>
            {record.email}
          </a>
        )
      }
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: "15%",
      ellipsis: true,
      render: (_, record) => {
        return (
          <a href={`tel:${record?.phone}`} style={{ textDecoration: "none" }}>
            {record.phone}
          </a>
        )
      }
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      align: "center",
      width: "15%",
      ellipsis: true,
      render: (_, record) => {
        return (
          <a href={`https://${record.website}`} target="framename" style={{ textDecoration: "none" }}>
            {record.website}
          </a>
        )
      }
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
    <>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={usersData} pagination={false} loading={loading} />
        </Col>
      </Row>
    </>
  )
}

export default Users
