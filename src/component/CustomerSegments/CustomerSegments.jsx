import React, { useState } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Table,
  Typography,
  Space,
  Modal,
  notification,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CustomerSegment from "../../entities/CustomerSegment";
import AddSegmentModal from "./modal/AddSegmentModal";

const { Title } = Typography;

const CustomerSegments = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSegment, setEditingSegment] = useState(null); // Track the segment being edited
  const [segmentData, setSegmentData] = useState([
    // Sample data for the table
    new CustomerSegment(
      "SG001",
      "Member",
      "2023-01-01T00:00:00Z",
      "2023-01-01T00:00:00Z"
    ),
    new CustomerSegment(
      "SG002",
      "Gold",
      "2023-01-02T00:00:00Z",
      "2023-01-02T00:00:00Z"
    ),
    
  ]);

  // Table columns with edit and delete buttons
  const columns = [
    {
      title: "Segment ID",
      dataIndex: "customerSegmentId",
      key: "customerSegmentId",
    },
    {
      title: "Segment Type",
      dataIndex: "customerSegmentType",
      key: "customerSegmentType",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            type="link"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Edit handler
  const handleEdit = (record) => {
    setEditingSegment(record); // Set the segment to be edited
    setIsModalVisible(true); // Show the modal
  };

  // Delete handler
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete the segment ${record.customerSegmentId}?`,
      onOk: () => {
        setSegmentData((prevData) =>
          prevData.filter(
            (segment) => segment.customerSegmentId !== record.customerSegmentId
          )
        );
        notification.success({
          message: "Segment Deleted",
          description: "The customer segment has been deleted successfully.",
        });
      },
    });
  };

  // Save or update customer segment
  const handleSaveSegment = (newSegment) => {
    if (
      !editingSegment &&
      segmentData.some(
        (segment) => segment.customerSegmentId === newSegment.customerSegmentId
      )
    ) {
      notification.error({
        message: "Duplicate Segment ID",
        description: `The Segment ID "${newSegment.customerSegmentId}" already exists. Please use a unique Segment ID.`,
      });
      return; 
    }

    if (editingSegment) {
      // Update existing segment
      const updatedSegmentData = segmentData.map((segment) => {
        const updatedSegment = [newSegment].find(
          (s) => s.customerSegmentId === segment.customerSegmentId
        );
        return updatedSegment || segment;
      });

      setSegmentData(updatedSegmentData);
      notification.success({
        message: "Segment Updated",
        description: "The customer segment has been updated successfully.",
      });
    } else {
      // Add new segment
      setSegmentData([...segmentData, newSegment]);
    }
    setIsModalVisible(false); // Close modal after saving
    setEditingSegment(null); // Clear editing segment state
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <Input
            placeholder="Search segments"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              setEditingSegment(null); // Clear any existing editing state
              setIsModalVisible(true); // Show modal for adding a new segment
            }}
          >
            Add Segment
          </Button>
        </Col>
      </Row>

      {/* Display segment count */}
      <Title level={4} style={{ marginBottom: "16px" }}>
        Total Segments: {segmentData.length}
      </Title>

      <Table
        dataSource={segmentData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="customerSegmentId" // Make sure each row has a unique key
        scroll={{ x: "max-content", y: 400 }} // Add horizontal and vertical scroll
      />

      <AddSegmentModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveSegment}
        segment={editingSegment} // Pass the segment being edited
      />
    </div>
  );
};

export default CustomerSegments;
