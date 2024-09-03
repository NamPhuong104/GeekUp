import React, { useState } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Table,
  Typography,
  Space,
  Modal,
  notification,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import NiceAccountNumber from "../component/entities/NiceAccountNumber";
import NiceAccountNumberDetail from "./NiceAccountNumberDetail";
import { v4 as uuidv4 } from "uuid";

const { Title } = Typography;

const NiceAccountNumbers = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountData, setAccountData] = useState([
    new NiceAccountNumber(
      "NA001",
      "111111111111",
      NiceAccountNumber.Status.ACTIVE,
      "2023-01-01T00:00:00Z",
      "2023-01-01T00:00:00Z"
    ),
    new NiceAccountNumber(
      "NA002",
      "55555555555",
      NiceAccountNumber.Status.INACTIVE,
      "2023-01-02T00:00:00Z",
      "2023-01-02T00:00:00Z"
    ),
  ]);

  const columns = [
    {
      title: "Account Number ID",
      dataIndex: "niceAccountNumberId",
      key: "niceAccountNumberId",
    },
    {
      title: "Nice Account Number",
      dataIndex: "niceAccountNumber",
      key: "niceAccountNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            type="link"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingAccount(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete the account ${record.niceAccountNumberId}?`,
      onOk: () => {
        setAccountData((prevData) =>
          prevData.filter(
            (account) =>
              account.niceAccountNumberId !== record.niceAccountNumberId
          )
        );
        notification.success({
          message: "Account Deleted",
          description: "The nice account number has been deleted successfully.",
        });
      },
    });
  };

  const handleSaveAccount = (newAccount) => {
    if (
      !editingAccount &&
      accountData.some(
        (account) => account.niceAccountNumber === newAccount.niceAccountNumber
      )
    ) {
      notification.error({
        message: "Duplicate Account",
        description: `The Account "${newAccount.niceAccountNumber}" already exists.`,
      });
      return;
    }

    if (editingAccount) {
      const updatedAccountData = accountData.map((account) => {
        const updatedAccount = [newAccount].find(
          (a) => a.niceAccountNumberId === account.niceAccountNumberId
        );
        return updatedAccount || account;
      });

      setAccountData(updatedAccountData);
      notification.success({
        message: "Account Updated",
        description: "The nice account number has been updated successfully.",
      });
    } else {
      setAccountData([...accountData, newAccount]);
      notification.success({
        message: "Account Created",
        description: "The nice account number has been created successfully.",
      });
    }
    setIsModalVisible(false);
    setEditingAccount(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split("\n").filter((row) => row.trim() !== "");
        const newAccounts = [];
        let hasDuplicates = false;

        rows.forEach((row, index) => {
          const [niceAccountNumber] = row.split(",").map((cell) => cell.trim());
          if (!niceAccountNumber) {
            notification.error({
              message: "Upload Error",
              description: `Row ${index + 1} is invalid. Please check the file format.`,
            });
            hasDuplicates = true;
            return;
          }

          if (
            accountData.some(
              (account) => account.niceAccountNumber === niceAccountNumber
            ) ||
            newAccounts.some(
              (account) => account.niceAccountNumber === niceAccountNumber
            )
          ) {
            hasDuplicates = true;
            return;
          }

          newAccounts.push(
            new NiceAccountNumber(
              uuidv4(),
              niceAccountNumber,
              NiceAccountNumber.Status.INACTIVE,
              new Date().toISOString(),
              new Date().toISOString()
            )
          );
        });

        if (hasDuplicates) {
          notification.error({
            message: "Upload Failed",
            description:
              "The file contains duplicate account numbers. Please check the file and try again.",
          });
        } else {
          setAccountData([...accountData, ...newAccounts]);
          notification.success({
            message: "Accounts Uploaded",
            description:
              "The nice account numbers have been added successfully.",
          });
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <Input
            placeholder="Search accounts"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => console.log("Search for:", searchText)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              setEditingAccount(null);
              setIsModalVisible(true);
            }}
          >
            Add Account
          </Button>
          <Button
            type="default"
            style={{ marginLeft: "8px" }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            Add File
          </Button>
          <input
            type="file"
            accept=".csv"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Col>
      </Row>

      <Title level={4} style={{ marginBottom: "16px" }}>
        Total Accounts: {accountData.length}
      </Title>

      <Table
        dataSource={accountData}
        columns={columns}
        pagination={{ pageSize: 100 }}
        rowKey="niceAccountNumberId"
        scroll={{ x: "max-content", y: 400 }}
      />

      <NiceAccountNumberDetail
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAccount}
        account={editingAccount}
      />
    </div>
  );
};

export default NiceAccountNumbers;
