import { ArrowLeftOutlined, FileImageOutlined } from "@ant-design/icons"
import { Avatar, Breadcrumb, Card, Image, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import instances from "../../../plugin/axios"

function AlbumDetail() {
  const navigate = useNavigate()
  const { Meta } = Card
  const { Text, Paragraph } = Typography
  const { id } = useParams()
  const [album, setAlbum] = useState([])
  const [user, setUser] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const albumRes = await instances.get(`/albums/${id}`)
      setAlbum(albumRes.data)
      const userRes = await instances.get(`/users/${albumRes.data.userId}`)
      setUser(userRes.data)
      const photosRes = await instances.get(`/photos?albumId=${id}&_start=0&_limit=10`)
      setPhotos(photosRes.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Breadcrumb
        style={{ fontSize: 20 }}
        items={[
          {
            title: (
              <>
                <FileImageOutlined />
                <span onClick={() => navigate(-1)} style={{ marginLeft: 4, textDecoration: "none", cursor: "pointer" }}>
                  Albums
                </span>
              </>
            )
          },
          {
            title: "Show"
          }
        ]}
      />

      <Paragraph>
        <Text style={{ fontSize: 30, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </span>
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
              <Link to={`/users/${user?.id}`}>
                <Text style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "none" }}>{user?.name}</Text>
              </Link>
              <a href={`mailto:${user?.email}`} target="_blank" rel="noopener noreferrer">
                {user?.email}
              </a>
            </div>
          </span>
        </Row>

        <Text style={{ fontSize: 30, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>{album.title}</Text>

        <Row gutter={16} style={{ display: "flex", gap: 10 }}>
          {photos?.map((item) => (
            <Card hoverable style={{ width: 240 }} key={item.id} loading={loading}>
              <Image width={200} height={200} alt={item.title} src={item.thumbnailUrl.replace("https://via.placeholder.com", `https://dummyjson.com/image`)} />
              <Meta title={item.title} />
            </Card>
          ))}
        </Row>
      </Card>
    </div>
  )
}

export default AlbumDetail
