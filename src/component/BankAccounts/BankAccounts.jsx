import { useState } from 'react';
import { Col, Flex, Row, Table } from 'antd';
import ModalCreateBankAccount from './modal/ModalCreateBankAccount';
import SearchInput from './SearchInput';
import ActionButtons from '../../global/ActionButtons';
import ViewBankAccountDrawer from './modal/ViewBankAccountDrawer';
import ModalUpdateBankAccount from './modal/ModalUpdateBankAccount';

const dataSource = [
  {
    key: '1',
    bankAccountNumber: '11111111111',
    name: 'Nguyen Nam Phuong',
    customerSegmentType: 'Ưu tiên',
    citizenIdentification: '0123456789',
  },
  {
    key: '2',
    bankAccountNumber: '11111111111',
    name: 'Nguyen Nam Phuong',
    customerSegmentType: 'Ưu tiên',
    citizenIdentification: '0123456789',
  },
];
function BankAccounts() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [bankAccountViewData, setBankAccountViewData] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [bankAccountUpdateData, setBankAccountUpdateData] = useState(null);

  const handleModal = (modalType, value) => {
    if (modalType === 'create') {
      ////
    } else if (modalType === 'view' && value) {
      setIsViewDrawerOpen(true);
      setBankAccountViewData(value);
    } else if (modalType === 'update' && value) {
      setIsUpdateModalOpen(true);
      setBankAccountUpdateData(value);
    }
  };

  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
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
      title: 'Phân khúc khách hàng',
      dataIndex: 'customerSegmentType',
      key: 'customerSegmentType',
      align: 'center',
      width: '15%',
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
            <ModalCreateBankAccount
              isOpen={isCreateModalOpen}
              setIsOpen={setIsCreateModalOpen}
            />
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
      <ViewBankAccountDrawer
        isViewDrawerOpen={isViewDrawerOpen}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
        bankAccountViewData={bankAccountViewData}
        setBankAccountViewData={setBankAccountViewData}
      />
      <ModalUpdateBankAccount
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        bankAccountUpdateData={bankAccountUpdateData}
        setBankAccountUpdateData={setBankAccountUpdateData}
      />
    </>
  );
}

export default BankAccounts;
