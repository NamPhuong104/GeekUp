import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, notification, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import CustomerSegment from '../../../entities/CustomerSegment';

const AddSegmentModal = ({ visible, onClose, onSave, segment }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (segment) {
      form.setFieldsValue({
        customerSegmentId: segment.customerSegmentId,
        customerSegmentType: segment.customerSegmentType,
        createdAt: segment.createdAt,
        updatedAt: segment.updatedAt,
      });
    } else {
      form.resetFields();
    }
  }, [segment, form]);

  const handleSave = (values) => {
    console.log("Form values on save:", values);

    const newSegment = new CustomerSegment(
      values.customerSegmentId,
      values.customerSegmentType,
      new Date().toISOString(),
      new Date().toISOString()
    );

    onSave(newSegment);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={segment ? "Edit Segment" : "Add Segment"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          name="customerSegmentId"
          label="Segment ID"
          rules={[{ required: true, message: "Please enter the segment ID" }]}
        >
          <Input placeholder="Segment ID" />
        </Form.Item>
        <Form.Item
          name="customerSegmentType"
          label="Segment Type"
          rules={[{ required: true, message: "Please select the segment type" }]}
        >
          <Input placeholder="Segment Type" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSegmentModal;
