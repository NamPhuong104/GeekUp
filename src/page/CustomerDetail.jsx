import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, notification, Select, Space, Row, Col, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Customer from "../entities/Customer";
import moment from 'moment';

const CustomerDetail = ({ visible, onClose, onSave, customer }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    if (customer) {
      form.setFieldsValue({
        customers: [
          {
            name: customer.name,
            email: customer.email,
            customerId: customer.customerId,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            identityCard: customer.identityCard,
            customerSegmentId: customer.customerSegmentId,
            dob: customer.dob ? moment(customer.dob, 'YYYY-MM-DD') : null,
          },
        ],
      });
    } else if (parsedData.length > 0) {
      form.setFieldsValue({ customers: parsedData });
    } else {
      form.resetFields();
    }
  }, [customer, form, parsedData]);

  const handleSave = (values) => {
    console.log("Form values on save:", values);

    const newCustomers = values.customers.map((customerEntry) => {
      return new Customer(
        customer ? customer.id : Math.random().toString(36).substr(2, 9),
        customerEntry.name,
        customerEntry.email,
        customerEntry.customerId,
        customerEntry.firstName,
        customerEntry.lastName,
        customerEntry.phoneNumber,
        customerEntry.dob ? customerEntry.dob.toISOString().split("T")[0] : null,
        customerEntry.address,
        customerEntry.identityCard,
        customerEntry.customerSegmentId,
        new Date().toISOString(),
        new Date().toISOString()
      );
    });

    onSave(newCustomers);
    notification.success({
      message: "Customers Added",
      description: "The customers have been added successfully.",
    });
    form.resetFields();
    setParsedData([]);
    onClose();
  };

  const handleFileUpload = (info) => {
    if (info.file.status === 'done') {
      setLoading(true);
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',');
  
        const dataWithDefaults = rows.slice(1).map((row, index) => {
          const values = row.split(',');
          const item = headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i] ? values[i].trim() : '';
            return obj;
          }, {});
  
          console.log(`Item ${index}:`, item); // Log the current item
  
          return {
            name: item.name || "",
            email: item.email || "",
            customerId: item.customerId || "",
            firstName: item.firstName || "",
            lastName: item.lastName || "",
            phoneNumber: item.phoneNumber || "",
            dob: item.dob ? moment(item.dob, 'YYYY-MM-DD') : null,
            address: item.address || "",
            identityCard: item.identityCard || "",
            customerSegmentId: item.customerSegmentId || "",
          };
        });
  
        setParsedData(dataWithDefaults);
  
        // Populate the form fields with the parsed data
        form.setFieldsValue({ customers: dataWithDefaults });
  
        setLoading(false);
        notification.success({
          message: "File Uploaded",
          description: "The file has been uploaded and parsed successfully.",
        });
      };
  
      reader.onerror = (err) => {
        setLoading(false);
        notification.error({
          message: "File Processing Error",
          description: `An error occurred while processing the file: ${err.message}`,
        });
      };
  
      reader.readAsText(info.file.originFileObj);
    }
  };
  
  

  return (
    <Modal
      title={customer ? "Edit Customer" : "Add Multiple Customers"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.List name="customers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8, flexWrap: "wrap" }}
                  align="baseline"
                >
                  <Row gutter={16} style={{ width: "100%" }}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "customerSegmentId"]}
                        fieldKey={[fieldKey, "customerSegmentId"]}
                        label="Customer Segment"
                        rules={[
                          { required: true, message: "Please select the customer segment" },
                        ]}
                      >
                        <Select placeholder="Select a customer segment">
                          <Option value="member">Member</Option>
                          <Option value="gold">Gold</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "firstName"]}
                        fieldKey={[fieldKey, "firstName"]}
                        label="First Name"
                        rules={[
                          { required: true, message: "Please enter the first name" },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "lastName"]}
                        fieldKey={[fieldKey, "lastName"]}
                        label="Last Name"
                        rules={[
                          { required: true, message: "Please enter the last name" },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "identityCard"]}
                        fieldKey={[fieldKey, "identityCard"]}
                        label="Identity Card"
                        rules={[
                          { required: true, message: "Please enter the identity card number" },
                        ]}
                      >
                        <Input placeholder="Identity Card" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "email"]}
                        fieldKey={[fieldKey, "email"]}
                        label="Email"
                        rules={[
                          { required: true, message: "Please enter the email" },
                          { type: "email", message: "Invalid email" },
                        ]}
                      >
                        <Input placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "phoneNumber"]}
                        fieldKey={[fieldKey, "phoneNumber"]}
                        label="Phone Number"
                        rules={[
                          { required: true, message: "Please enter the phone number" },
                          { pattern: /^[0-9]+$/, message: "Phone number must be numeric" },
                        ]}
                      >
                        <Input placeholder="Phone Number" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "dob"]}
                        fieldKey={[fieldKey, "dob"]}
                        label="Date of Birth"
                      >
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "address"]}
                        fieldKey={[fieldKey, "address"]}
                        label="Address"
                      >
                        <Input.TextArea placeholder="Address" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Customer
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save All
          </Button>
        </Form.Item>
        <Form.Item>
          <Upload
            accept=".csv"
            showUploadList={true}
            customRequest={({ file, onSuccess, onError }) => {
              handleFileUpload({ file: { originFileObj: file, status: 'done' } });
              onSuccess();
            }}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              {loading ? 'Processing...' : 'Upload Customer Data'}
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerDetail;