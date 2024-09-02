import { Drawer, Typography } from 'antd';

function ViewOnlineAccount(props) {
  const {
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    onlineAccountData,
    setOnlineAccountData,
  } = props;
  const { Text, Paragraph } = Typography;

  const handleCloseViewDrawer = () => {
    setIsViewDrawerOpen(false);
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
      {/* <Paragraph>
        <Text strong>Số thẻ: </Text>
        <Text>1212121212121212</Text>
      </Paragraph> */}
      <Paragraph>
        <Text strong>Số điện thoại: </Text>
        <Text>0123456789</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Email: </Text>
        <Text>abc@gmail.com</Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Số tài khoản: </Text>
        <Text>0123456789</Text>
      </Paragraph>
    </Drawer>
  );
}

export default ViewOnlineAccount;
