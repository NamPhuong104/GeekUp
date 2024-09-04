import { Drawer, Typography } from 'antd';

function ViewBankAccountDrawer(props) {
  const {
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    bankAccountViewData,
    setBankAccountViewData,
  } = props;
  const { Text, Paragraph } = Typography;
  const handleCloseViewDrawer = () => {
    setIsViewDrawerOpen(false);
    setBankAccountViewData(null);
  };
  return (
    <Drawer
      title="Thông tin tài khoản"
      placement="right"
      open={isViewDrawerOpen}
      onClose={handleCloseViewDrawer}
    >
      <Paragraph>
        <Text strong>Số căn cước công dân: </Text>
        <Text>123123123</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Họ và tên: </Text>
        <Text>Jack</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Email: </Text>
        <Text>abc@gmail.com</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Số điện thoại: </Text>
        <Text>0123456789</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Số tài khoản: </Text>
        <Text>0123456789</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Ngày sinh: </Text>
        <Text>1/1/1111</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Địa chỉ: </Text>
        <Text>HCM City</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Phân khúc khách hàng: </Text>
        <Text>Ưu tiên</Text>
      </Paragraph>
    </Drawer>
  );
}

export default ViewBankAccountDrawer;
