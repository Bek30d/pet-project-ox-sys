import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Typography,
  Divider,
  message,
  Row,
  Col,
} from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  SecurityScanOutlined,
  BellOutlined,
} from '@ant-design/icons';
import AdminLayout from '../components/AdminLayout';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    siteName: 'Admin Panel',
    siteDescription: 'Korporativ boshqaruv tizimi',
    language: 'uz',
    timezone: 'Asia/Tashkent',
    emailNotifications: true,
    smsNotifications: false,
    securityLevel: 'medium',
    sessionTimeout: 30,
    enableRegistration: true,
    enableApiAccess: true,
  };

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', values);
      message.success('Sozlamalar muvaffaqiyatli saqlandi!');
    } catch (error) {
      message.error('Sozlamalarni saqlashda xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue(initialValues);
    message.info('Sozlamalar dastlabki holatga qaytarildi');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Title level={2}>Sozlamalar</Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSave}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} lg={12}>
              <Card title="Asosiy sozlamalar" className="h-full">
                <Form.Item
                  name="siteName"
                  label="Sayt nomi"
                  rules={[{ required: true, message: 'Sayt nomini kiriting!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="siteDescription" label="Sayt tavsifi">
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item name="language" label="Til">
                  <Select>
                    <Option value="uz">O'zbek</Option>
                    <Option value="ru">Русский</Option>
                    <Option value="en">English</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="timezone" label="Vaqt mintaqasi">
                  <Select>
                    <Option value="Asia/Tashkent">Toshkent</Option>
                    <Option value="Europe/Moscow">Moskva</Option>
                    <Option value="Europe/London">London</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Xavfsizlik sozlamalari">
                <Form.Item name="securityLevel" label="Xavfsizlik darajasi">
                  <Select>
                    <Option value="low">Past</Option>
                    <Option value="medium">O'rta</Option>
                    <Option value="high">Yuqori</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="sessionTimeout" label="Sessiya muddati (daqiqa)">
                  <Input type="number" min={5} max={120} />
                </Form.Item>

                <Form.Item name="enableRegistration" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <Text>Ro'yxatdan o'tishni yoqish</Text>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item name="enableApiAccess" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <Text>API kirishni yoqish</Text>
                    <Switch />
                  </div>
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Card title="Bildirishnoma sozlamalari">
            <Row gutter={[24, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="emailNotifications" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong>Email bildirishnomalar</Text>
                      <br />
                      <Text type="secondary" className="text-sm">
                        Muhim hodisalar haqida email orqali xabar berish
                      </Text>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item name="smsNotifications" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong>SMS bildirishnomalar</Text>
                      <br />
                      <Text type="secondary" className="text-sm">
                        Tez xabarlar uchun SMS yuborish
                      </Text>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Divider />

          <div className="flex justify-end gap-4">
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              Bekor qilish
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              loading={loading}
            >
              Saqlash
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Settings;
