import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import NiceAccountNumber from "../component/entities/NiceAccountNumber";
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const NiceAccountNumberDetail = ({ visible, onClose, onSave, account }) => {
  const [form] = useForm();
  const isEditing = !!account; // Check if the form is in edit mode

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        niceAccountNumberId: account.niceAccountNumberId,
        niceAccountNumber: account.niceAccountNumber,
        status: account.status,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      });
    } else {
      form.resetFields();
    }
  }, [account, form]);

  const handleSave = (values) => {
    console.log("Form values on save:", values);

    const newAccount = new NiceAccountNumber(
      isEditing ? account.niceAccountNumberId : uuidv4(), // Use existing ID if editing
      values.niceAccountNumber,
      values.status,
      new Date().toISOString(),
      new Date().toISOString()
    );

    onSave(newAccount);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={isEditing ? "Edit Account" : "Add Account"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          name="niceAccountNumber"
          label="Nice Account Number"
          rules={[{ required: true, message: "Please enter the nice account number" }]}
        >
          <Input
            placeholder="Nice Account Number"
            disabled={isEditing} // Disable input only in edit mode
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status" }]}
        >
          <Select placeholder="Select status">
            <Option value={NiceAccountNumber.Status.ACTIVE}>Active</Option>
            <Option value={NiceAccountNumber.Status.INACTIVE}>Inactive</Option>
          </Select>
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

export default NiceAccountNumberDetail;
