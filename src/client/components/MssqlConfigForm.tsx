import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Space, message } from 'antd';
import { useActionContext, useRequest } from '@nocobase/client';

type FormValues = {
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  encrypt?: boolean;
};

const normalizePayload = (values: FormValues) => {
  const { encrypt, ...rest } = values;
  return {
    ...rest,
    dialectOptions: {
      encrypt: !!encrypt,
      options: {
        encrypt: !!encrypt,
      },
    },
  };
};

const MssqlConfigForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const action = useActionContext();
  const { run: testConnection, loading } = useRequest(
    {
      url: 'external-mssql:testConnection',
      method: 'post',
    },
    { manual: true },
  );

  const handleTestConnection = async () => {
    try {
      const values = await form.validateFields();
      await testConnection(normalizePayload(values));
      message.success('Connection successful');
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to connect with the provided settings';
      message.error(msg);
    }
  };

  const handleFinish = async (values: FormValues) => {
    if (action?.run) {
      await action.run(normalizePayload(values));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ port: 1433, encrypt: false }}
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
