import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  Form,
  Select,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AdminLayout from "../components/AdminLayout";

const { Title } = Typography;
const { Option } = Select;

interface User {
  key: string;
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

const Users: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const initialData: User[] = [
    {
      key: "1",
      id: 1,
      name: "Alisher Karimov",
      email: "alisher@example.com",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      key: "2",
      id: 2,
      name: "Mohira Tosheva",
      email: "mohira@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-20",
    },
    {
      key: "3",
      id: 3,
      name: "Bobur Rahimov",
      email: "bobur@example.com",
      role: "user",
      status: "inactive",
      createdAt: "2024-01-25",
    },
    {
      key: "4",
      id: 4,
      name: "Sevara Nazarova",
      email: "sevara@example.com",
      role: "moderator",
      status: "active",
      createdAt: "2024-02-01",
    },
  ];

  const [users, setUsers] = useState<User[]>(initialData);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Ism",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value: any, record: User) =>
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const colors: Record<string, string> = {
          admin: "red",
          moderator: "blue",
          user: "green",
        };
        return <Tag color={colors[role]}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Faol" : "Nofaol"}
        </Tag>
      ),
    },
    {
      title: "Yaratilgan sana",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Tahrirlash
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Foydalanuvchini o'chirish",
      content: "Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz?",
      okText: "Ha",
      cancelText: "Yo'q",
      onOk: () => {
        setUsers(users.filter((user) => user.id !== id));
        message.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...values } : user
          )
        );
        message.success("Foydalanuvchi ma'lumotlari yangilandi");
      } else {
        const newUser: User = {
          key: String(users.length + 1),
          id: users.length + 1,
          ...values,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setUsers([...users, newUser]);
        message.success("Yangi foydalanuvchi qo'shildi");
      }
      setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Title level={2}>Foydalanuvchilar</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Yangi foydalanuvchi
          </Button>
        </div>

        <Card>
          <div className="mb-4">
            <Input
              placeholder="Foydalanuvchi yoki email bo'yicha qidirish..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table
            columns={columns}
            dataSource={users}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} / ${total} ta foydalanuvchi`,
            }}
          />
        </Card>

        <Modal
          title={
            editingUser ? "Foydalanuvchini tahrirlash" : "Yangi foydalanuvchi"
          }
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Saqlash"
          cancelText="Bekor qilish"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Ism"
              rules={[{ required: true, message: "Ismni kiriting!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Emailni kiriting!" },
                { type: "email", message: "To'g'ri email kiriting!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Rol"
              rules={[{ required: true, message: "Rolni tanlang!" }]}
            >
              <Select>
                <Option value="user">User</Option>
                <Option value="moderator">Moderator</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Statusni tanlang!" }]}
            >
              <Select>
                <Option value="active">Faol</Option>
                <Option value="inactive">Nofaol</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Users;
