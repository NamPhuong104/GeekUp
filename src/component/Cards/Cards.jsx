import { Col, Flex, Row, Table } from 'antd';
import { useState } from 'react';
import ActionButtons from '../../global/ActionButtons';
import ModalCreateCards from './Modal/ModalCreateCards';
import ModalUpdateCard from './Modal/ModalUpdateCard';
import ViewCardDrawer from './Modal/ViewCardDrawer';
import SearchInput from './SearchInput';

const dataSource = [
  {
    key: '1',
    phoneNumber: '0123456789',
    name: 'Nguyen Nam Phuong',
    cardNumber: '9999999999',
    citizenIdentification: '0123456789',
  },
  {
    key: '2',
    phoneNumber: '0123456789',
    name: 'Nguyen Nam Phuong',
    cardNumber: '9999999999',
    citizenIdentification: '0123456789',
  },
];

function Cards() {
  const [isOpenCards, setIsOpenCards] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [cardViewData, setCardViewData] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [cardUpdateData, setCardUpdateData] = useState(null);

  const handleModal = (modalType, value) => {
    if (modalType === 'create') {
      ////
    } else if (modalType === 'view' && value) {
      setIsViewDrawerOpen(true);
      setCardViewData(value);
    } else if (modalType === 'update' && value) {
      setIsUpdateModalOpen(true);
      setCardUpdateData(value);
    }
  };

  const handleConfirmDeleteBranch = () => {};

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
      title: 'Số thẻ',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
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
            handleDeleteRecord={() => handleConfirmDeleteBranch(record._id)}
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
            <ModalCreateCards
              isOpenCards={isOpenCards}
              setIsOpenCards={setIsOpenCards}
            />
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
      <ViewCardDrawer
        isViewDrawerOpen={isViewDrawerOpen}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
        cardViewData={cardViewData}
        setCardViewData={setCardViewData}
      />
      <ModalUpdateCard
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        cardUpdateData={cardUpdateData}
        setCardUpdateData={setCardUpdateData}
      />
    </>
  );
}

export default Cards;
