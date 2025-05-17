import { Avatar, Col, notification, Row, Table, Typography } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ActionButtons from "../../global/ActionButtons"
import instances from "../../plugin/axios"

function Albums() {
  const navigate = useNavigate()
  const { Paragraph } = Typography

  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1")
  const perPage = parseInt(searchParams.get("perPage") || "20")

  const [albumsData, setAlbumsData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [loading, setIsLoading] = useState(false)

  const [total, setTotal] = useState(100)

  useEffect(() => {
    fetchAlbums(page, perPage)
  }, [page, perPage])

  useEffect(() => {
    const uniqueUserIds = [...new Set(albumsData.map((album) => album.userId))]

    if (uniqueUserIds.length > 0) {
      fetchUsers(uniqueUserIds)
    }
  }, [albumsData])

  const fetchAlbums = async () => {
    setIsLoading(true)
    try {
      const res = await instances(`/albums?_start=${(page - 1) * perPage}&_limit=${perPage}`)
      setAlbumsData(res.data)
      setTotal(parseInt(res.headers["x-total-count"]))
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching albums:", error)
      notification.error({
        message: "Fail to fetch data",
        description: error.message || "Something went wrong!"
      })
      setIsLoading(false)
    }
  }

  const fetchUsers = async (userIds) => {
    setIsLoading(true)
    try {
      const idsQuery = userIds.map((id) => `id=${id}`).join("&")
      const res = await instances(`/users?${idsQuery}`)
      setUsersData(res.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching users:", error)
      notification.error({
        message: "Fail to fetch data",
        description: error.message || "Something went wrong!"
      })
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
      width: "10%",
      ellipsis: true
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "start",
      width: "20%",
      ellipsis: true
    },
    {
      title: "User",
      key: "user",
      align: "center",
      width: "30%",
      ellipsis: true,
      render: (_, record) => {
        const user = usersData.find((user) => user.id === record.userId)
        return (
          <Paragraph style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=random`} />
            {/* <a onClick={() => navigate(`/users/${user.id}`)} style={{ color: "blue" }}>
              {user?.name}
            </a> */}
            <a href={`/users/${user?.id}`} style={{ color: "blue" }}>
              {user?.name}
            </a>
          </Paragraph>
        )
      }
    },
    {
      title: "Actions",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record) => <ActionButtons record={record} handleViewModal={() => handleModal("view", record)} />
    }
  ]

  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={albumsData}
            loading={loading}
            pagination={{
              current: page,
              pageSize: perPage,
              total,
              onChange: (newPage, newPerPage) => {
                setSearchParams({ page: newPage, perPage: newPerPage })
              }
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default Albums
