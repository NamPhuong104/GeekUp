import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
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

const niceNumber = [
  {
    value: '111111111',
    label: '111111111',
  },
  {
    value: '222222222',
    label: '222222222',
  },
  {
    value: '123456789',
    label: '123456789',
  },
  {
    value: '444499999',
    label: '444499999',
  },
  {
    value: '234567777',
    label: '1234567777',
  },
];

function ModalUpdateCard(props) {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    cardUpdateData,
    setCardUpdateData,
  } = props;
  const [form] = Form.useForm();

  const randomNum = () => {
    return (
      Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
    );
  };

  const onCloseModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setCardUpdateData(null);
  };
  const onFinish = (values) => {
    console.log(values);
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Tạo mới thẻ"
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
              // showSearch
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
              options={fullName}
            />
          </Form.Item>

          <Form.Item
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
              options={niceNumber}
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
            <Input disabled defaultValue={randomNum} />
          </Form.Item>

          <Row gutter={[20, 16]}>
            <Col span={12}>
              <Form.Item
                label="Ngày bắt đầu"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày bắt đầu',
                  },
                ]}
              >
                <DatePicker locale={locale} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Ngày hết hạn"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày kết thúc',
                  },
                ]}
              >
                <DatePicker locale={locale} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdateCard;
