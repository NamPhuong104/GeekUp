import { Col, Flex, Row, Table } from 'antd';
import ActionButtons from '../../global/ActionButtons';
import SearchInput from './SearchInput';
import ModalCreateAccount from './modal/ModalCreateAccount';
import { useState } from 'react';
import ViewOnlineAccount from './modal/ViewOnlineAccount';
import ModalUpdateOnlineAccount from './modal/ModalUpdateOnlineAccount';

const dataSource = [
  {
    key: '1',
    phoneNumber: '0123456789',
    name: 'Nguyen Nam Phuong',
    citizenIdentification: '0123456789',
  },
  {
    key: '2',
    phoneNumber: '0123456789',
    name: 'Nguyen Nam Phuong',
    citizenIdentification: '0123456789',
  },
];

function OnlineAccounts() {
  const [isOpenOnlineAccount, setIsOpenOnlineAccount] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [onlineAccountData, setOnlineAccountData] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [onlineAccountUpdateData, setOnlineAccountUpdateData] = useState(null);

  const handleConfirmDeleteAccount = () => {};

  const handleModal = (modalType, value) => {
    if (modalType === 'create' && value) {
      ///
    } else if (modalType === 'view' && value) {
      setIsViewDrawerOpen(true);
      setOnlineAccountData(value);
    } else if (modalType === 'update' && value) {
      setIsUpdateModalOpen('update');
      setOnlineAccountUpdateData(value);
    }
  };

  const columns = [
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Căn cước công dân',
      dataIndex: 'citizenIdentification',
      key: 'citizenIdentification',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '20%',
      align: 'center',
      render: (_, record) => {
        return (
          <ActionButtons
            record={record}
            handleViewModal={() => handleModal('view', record)}
            handleUpdateModal={() => handleModal('update', record)}
            handleDeleteRecord={() => handleConfirmDeleteAccount(record._id)}
          />
        );
      },
    },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: '10px 20px' }}
          >
            <SearchInput />
            <ModalCreateAccount
              isOpenOnlineAccount={isOpenOnlineAccount}
              setIsOpenOnlineAccount={setIsOpenOnlineAccount}
            />
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>

      <ViewOnlineAccount
        isViewDrawerOpen={isViewDrawerOpen}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
        onlineAccountData={onlineAccountData}
        setOnlineAccountData={setOnlineAccountData}
      />
      <ModalUpdateOnlineAccount
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        onlineAccountUpdateData={onlineAccountUpdateData}
        setOnlineAccountData={setOnlineAccountData}
      />
    </>
  );
}

export default OnlineAccounts;
