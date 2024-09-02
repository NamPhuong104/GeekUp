import { Form, Input, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function ModalUpdateOnlineAccount(props) {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    onlineAccountUpdateData,
    setOnlineAccountData,
  } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    form.resetFields();
    setIsUpdateModalOpen(false);
  };
  const onCloseModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Cập nhật tài khoản"
        centered
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={onCloseModal}
        okText="Lưu"
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
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
            <Input
              showSearch
              placeholder="Vui lòng chọn họ và tên"
              optionFilterProp="label"
              //   options={fullName}
            />
          </Form.Item>

          {/* <Form.Item
            label="Số thẻ"
            name="cardNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn số thẻ',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Vui lòng chọn số thẻ"
              optionFilterProp="label"
              //   options={niceNumber}
            />
          </Form.Item> */}

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

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateOnlineAccount;
