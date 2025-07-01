
import React from 'react';
import { Card, Row, Col, Statistic, Typography, Timeline, Table } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TrendingUpOutlined,
} from '@ant-design/icons';
import AdminLayout from '../components/AdminLayout';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const recentActivities = [
    {
      color: 'green',
      children: 'Yangi foydalanuvchi ro\'yxatdan o\'tdi',
    },
    {
      color: 'blue',
      children: 'Tizim yangilandi',
    },
    {
      color: 'red',
      children: 'Xatolik tuzatildi',
    },
    {
      children: 'Ma\'lumotlar bazasi backup olindi',
    },
  ];

  const tableData = [
    {
      key: '1',
      name: 'Alisher Karimov',
      email: 'alisher@example.com',
      status: 'Faol',
      role: 'Admin',
    },
    {
      key: '2',
      name: 'Mohira Tosheva',
      email: 'mohira@example.com',
      status: 'Faol',
      role: 'Foydalanuvchi',
    },
    {
      key: '3',
      name: 'Bobur Rahimov',
      email: 'bobur@example.com',
      status: 'Nofaol',
      role: 'Foydalanuvchi',
    },
  ];

  const columns = [
    {
      title: 'Ism',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={status === 'Faol' ? 'text-green-600' : 'text-red-600'}>
          {status}
        </span>
      ),
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Title level={2}>Dashboard</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Jami Foydalanuvchilar"
                value={1128}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Buyurtmalar"
                value={93}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Daromad"
                value={112893}
                prefix={<DollarOutlined />}
                suffix="UZS"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="O'sish"
                value={11.28}
                prefix={<TrendingUpOutlined />}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="So'nggi Faoliyat" className="h-full">
              <Timeline items={recentActivities} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="So'nggi Foydalanuvchilar">
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
