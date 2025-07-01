import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Spin } from "antd";
import { UserOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authService";
import { LoginCredentials } from "../types/auth";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(values);

      const userData = {
        username: values.username,
        token: response.token,
        subdomain: values.subdomain,
      };

      login(userData);
      message.success("Muvaffaqiyatli tizimga kirdingiz!");
      navigate("/users");
    } catch (error: unknown) {
      console.error("Login error:", error);
      message.error(
        "Login jarayonida xatolik yuz berdi. Ma'lumotlarni tekshiring."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <Title level={2} className="text-gray-800 mb-2">
            Admin Panel
          </Title>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            label="Users name"
            rules={[{ required: true, message: "Enter the name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="User name" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Enter the password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Parol" />
          </Form.Item>

          <Form.Item
            name="subdomain"
            label="Subdomain"
            rules={[{ required: true, message: "Enter the subdomain" }]}
          >
            <Input prefix={<GlobalOutlined />} placeholder="Subdomain" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
