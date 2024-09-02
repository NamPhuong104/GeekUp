import React, { useState } from 'react';
import { Input, Button, Row, Col, Table, Typography, Space, Modal, Tag, notification } from 'antd'; 
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Customer from '../entities/Customer'; 
import CustomerDetail from './CustomerDetail'; 

const { Title } = Typography;

const Customers = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null); // Track the customer being edited
  const [customerData, setCustomerData] = useState([
    // Sample data for the table
    new Customer(
      'dgvdsv',
      'John Doe',
      'john.doe@example.com',
      'C001',
      'John',
      'Doe',
      '09232424566',
      '1990-01-01',
      '123 Main St, Springfield',
      'ID123456789',
      'member',
      '2023-01-01T00:00:00Z',
      '2023-01-01T00:00:00Z'
    ),
    new Customer(
      'sdcnsij',
      'Jane Smith',
      'jane.smith@example.com',
      'C002',
      'Jane',
      'Smith',
      '09232424566',
      '1985-05-15',
      '456 Elm St, Springfield',
      'ID987654321',
      'gold',
      '2023-01-02T00:00:00Z',
      '2023-01-02T00:00:00Z'
    ),
    // Add more sample data as needed
  ]);

  // Function to determine tag color based on customer segment
  const getSegmentTagColor = (segment) => {
    switch (segment) {
      case 'member':
        return 'blue';
      case 'gold':
        return 'gold';
      default:
        return 'default'; // Default tag color
    }
  };

  // Table columns with edit and delete buttons
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Segment',
      dataIndex: 'customerSegmentId',
      key: 'customerSegmentId',
      render: (segment) => (
        <Tag color={getSegmentTagColor(segment)}>
          {segment ? segment.toUpperCase() : 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Identity Card',
      dataIndex: 'identityCard',
      key: 'identityCard',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Actions',
      key: 'actions',
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
    setEditingCustomer(record); // Set the customer to be edited
    setIsModalVisible(true); // Show the modal
  };

  // Delete handler
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete ${record.firstName}?`,
      onOk: () => {
        setCustomerData((prevData) => prevData.filter(customer => customer.id !== record.id));
        notification.success({
          message: 'Customer Deleted',
          description: 'The customer has been deleted successfully.',
        });
      },
    });
  };

  // Save or update customer
  const handleSaveCustomer = (newCustomers) => {
    if (editingCustomer) {
      // Update existing customer
      const updatedCustomerData = customerData.map(customer => {
        const updatedCustomer = newCustomers.find(c => c.id === customer.id);
        return updatedCustomer || customer;
      });
      setCustomerData(updatedCustomerData);
    } else {
      // Add new customers
      setCustomerData([...customerData, ...newCustomers]);
    }
    setIsModalVisible(false); // Close modal after saving
    setEditingCustomer(null); // Clear editing customer state
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <Input
            placeholder="Search customers"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log('Search for:', searchText)}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button 
            type="primary" 
            onClick={() => {
              setEditingCustomer(null); // Clear any existing editing state
              setIsModalVisible(true); // Show modal for adding a new customer
            }} 
          >
            Add Customer
          </Button>
        </Col>
      </Row>
      
      {/* Display customer count */}
      <Title level={4} style={{ marginBottom: '16px' }}>
        Total Customers: {customerData.length}
      </Title>
      
      <Table
        dataSource={customerData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id" // Make sure each row has a unique key
        scroll={{ x: 'max-content', y: 400 }} // Add horizontal and vertical scroll
      />
      
      <CustomerDetail
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveCustomer}
        customer={editingCustomer} // Pass the customer being edited
      />
    </div>
  );
};

export default Customers;
