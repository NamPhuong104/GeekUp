import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

function ModalCreateAccount(props) {
  const { isOpenOnlineAccount, setIsOpenOnlineAccount } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    setIsOpenOnlineAccount(false);
  };
  const onCloseModal = () => {
    form.resetFields();
    setIsOpenOnlineAccount(false);
  };
  return (
    <>
      <Button
        size="large"
        type="primary"
        onClick={() => setIsOpenOnlineAccount(!isOpenOnlineAccount)}
      >
        Tạo mới tài khoản
      </Button>
      <Modal
        title="Tạo mới tài khoản"
        centered
        open={isOpenOnlineAccount}
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

export default ModalCreateAccount;
