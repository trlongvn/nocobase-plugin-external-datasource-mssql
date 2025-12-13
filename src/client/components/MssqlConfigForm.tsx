import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Space, message } from 'antd';
import { useAPIClient, useRequest } from '@nocobase/client';
import {
  MssqlFormValues,
  NormalizedMssqlPayload,
  normalizeMssqlPayload,
} from '../utils/normalizeMssqlPayload';

const DEFAULT_INITIAL_VALUES: Partial<MssqlFormValues> = {
  port: 1433,
  encrypt: false,
  schema: 'dbo',
  trustServerCertificate: false,
};

type FormProps = {
  onSubmit?: (values: NormalizedMssqlPayload) => void | Promise<void>;
  onChange?: (values: MssqlFormValues) => void;
};

const MssqlConfigForm: React.FC<FormProps> = ({ onSubmit, onChange }) => {
  const [form] = Form.useForm<MssqlFormValues>();
  const api = useAPIClient();
  const { run: testConnection, loading } = useRequest(
    async (data: NormalizedMssqlPayload) => {
      const response = await api.request({
        url: 'external-mssql:testConnection',
        method: 'post',
        data,
      });
      if (response?.data?.status === 'error') {
        throw new Error(response.data.message);
      }
      return response?.data;
    },
    { manual: true },
  );

  const handleTestConnection = async () => {
    try {
      const values = await form.validateFields();
      await testConnection(normalizeMssqlPayload(values));
      message.success('Connection successful');
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Connection failed. Please verify host, port, credentials, and network connectivity.';
      message.error(msg);
    }
  };

  const handleFinish = async (values: MssqlFormValues) => {
    const payload = normalizeMssqlPayload(values);
    if (onSubmit) {
      await onSubmit(payload);
    }
  };

  const handleValuesChange = (_changed: any, allValues: MssqlFormValues) => {
    if (onChange) {
      onChange(allValues);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      initialValues={DEFAULT_INITIAL_VALUES}
    >
      <Form.Item
        name="host"
        label="Host"
        rules={[{ required: true, message: 'Please enter host' }]}
      >
        <Input placeholder="e.g. localhost" />
      </Form.Item>
      <Form.Item name="port" label="Port" rules={[{ required: true, message: 'Please enter port' }]}>
        <InputNumber style={{ width: '100%' }} min={1} max={65535} />
      </Form.Item>
      <Form.Item
        name="database"
        label="Database"
        rules={[{ required: true, message: 'Please enter database name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="schema" label="Schema">
        <Input placeholder="dbo" />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please enter username' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter password' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="encrypt" valuePropName="checked">
        <Checkbox>Encrypt connection (SSL/TLS)</Checkbox>
      </Form.Item>
      <Form.Item name="trustServerCertificate" valuePropName="checked">
        <Checkbox>Trust server certificate</Checkbox>
      </Form.Item>

      <Space>
        <Button onClick={handleTestConnection} loading={loading}>
          Test connection
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Space>
    </Form>
  );
};

export default MssqlConfigForm;
