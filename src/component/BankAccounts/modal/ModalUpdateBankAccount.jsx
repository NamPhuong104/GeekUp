import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';

const citizenIdentification = [
  {
    value: 123,
    label: 123,
  },
  {
    value: 456,
    label: 456,
  },
  {
    value: 789,
    label: 789,
  },
  {
    value: 890,
    label: 890,
  },
  {
    value: 190,
    label: 190,
  },
];

const fullName = [
  {
    value: 'Tom',
    label: 'Tom',
  },
  {
    value: 'Jack',
    label: 'Jack',
  },
  {
    value: 'Tony',
    label: 'Tony',
  },
  {
    value: 'Harry',
    label: 'Harry',
  },
  {
    value: 'Jenny',
    label: 'Jenny',
  },
];

function ModalUpdateBankAccount(props) {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    bankAccountUpdateData,
    setBankAccountUpdateData,
  } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    setIsUpdateModalOpen(false);
  };

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setBankAccountUpdateData(null);
  };

  const randomNum = () => {
    return (
      Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
    );
  };

  return (
    <>
      <Modal
        title="Cập nhật tài khoản"
        centered
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCloseUpdateModal}
        okText="Cập nhật"
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Số căn cước công dân"
            name="citizenIdentification"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền số căn cước công dân',
              },
            ]}
          >
            <Select
              allowClear
              placeholder="Vui lòng chọn số căn cước công dân"
              optionFilterProp="label"
              options={citizenIdentification}
            />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn họ và tên',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Vui lòng chọn họ và tên"
              optionFilterProp="label"
              // showSearch
              options={fullName}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
            ]}
          >
            <Input
              placeholder="abc@gmail.com"
              onChange={(e) => console.log(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
            ]}
          >
            <Input placeholder="012345566778" />
          </Form.Item>

          <Form.Item label="Số tài khoản" name="bankAccountNumber">
            <Input
              disabled
              onChange={(e) => console.log(e.target.value)}
              defaultValue={randomNum}
            />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: 'Vui lòng ngày sinh',
              },
            ]}
          >
            <DatePicker locale={locale} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ',
              },
            ]}
          >
            <Input
              placeholder="Nhập địa chỉ"
              onChange={(e) => console.log(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Phân khúc khách hàng"
            name="customerSegmentType"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn phân khúc khách hàng',
              },
            ]}
          >
            <Select
              placeholder="Vui lòng phân khúc khách hàng"
              onChange={(value) => console.log(value)}
              options={[
                { value: 0, label: 'Ưu tiên' },
                { value: 1, label: 'Thường' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateBankAccount;
