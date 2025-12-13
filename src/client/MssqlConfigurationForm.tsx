import React, { useState } from 'react';
import { useAPIClient } from '@nocobase/client';
import { Form, Input, InputNumber, Button, message, Space, Checkbox } from 'antd';
import { MssqlFormValues, normalizeMssqlPayload } from './utils/normalizeMssqlPayload';

export const MssqlConfigurationForm: React.FC<any> = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const api = useAPIClient();

  const handleTestConnection = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const payload = normalizeMssqlPayload(values);

      const response = await api.request({
        url: 'external-mssql:testConnection',
        method: 'post',
        data: payload,
      });

      if (response?.data?.status === 'success') {
        message.success('Connection successful!');
      } else {
        message.error(response?.data?.message || 'Connection failed');
      }
    } catch (error: any) {
      message.error('Connection test failed: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (onChange) {
      onChange(allValues);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={value || {
        port: 1433,
        schema: 'dbo',
        encrypt: true,
        trustServerCertificate: true,
      }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="Host"
        name="host"
        rules={[{ required: true, message: 'Please input the host!' }]}
      >
        <Input placeholder="localhost or IP address" />
      </Form.Item>

      <Form.Item
        label="Port"
        name="port"
        rules={[{ required: true, message: 'Please input the port!' }]}
      >
        <InputNumber placeholder="1433" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Database"
        name="database"
        rules={[{ required: true, message: 'Please input the database name!' }]}
      >
        <Input placeholder="database name" />
      </Form.Item>

      <Form.Item
        label="Schema"
        name="schema"
      >
        <Input placeholder="dbo" />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input the username!' }]}
      >
        <Input placeholder="username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>

      <Form.Item
        label="Encrypt Connection"
        name="encrypt"
        valuePropName="checked"
      >
        <Checkbox>Enable SSL/TLS encryption</Checkbox>
      </Form.Item>

      <Form.Item
        label="Trust Server Certificate"
        name="trustServerCertificate"
        valuePropName="checked"
      >
        <Checkbox>Trust self-signed certificates</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            type="primary"
            onClick={handleTestConnection}
            loading={loading}
          >
            Test Connection
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
