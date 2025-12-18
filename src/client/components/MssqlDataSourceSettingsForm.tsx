import React from 'react';
import type { ISchema } from '@formily/json-schema';
import { SchemaComponent } from '@nocobase/client';
import { useTranslation } from 'react-i18next';

type Props = {
  CollectionsTableField?: any;
  loadCollections?: (key: string) => Promise<any>;
  from?: 'create' | 'edit';
};

const NAMESPACE = 'data-source-manager';

const MssqlDataSourceSettingsForm: React.FC<Props> = ({
  CollectionsTableField,
  loadCollections,
  from,
}) => {
  const { t } = useTranslation();
  const SchemaComponentAny = SchemaComponent as any;
  const fieldsHelper = CollectionsTableField?.({ NAMESPACE, t });

  const collectionsSchema =
    fieldsHelper?.createCollectionsSchema && loadCollections
      ? fieldsHelper.createCollectionsSchema(from, loadCollections)
      : undefined;

  const addAllCollectionsSchema =
    fieldsHelper?.addAllCollectionsSchema || {
      type: 'boolean',
      default: true,
      'x-display': 'hidden',
    };

  const schema: ISchema = {
    type: 'void',
    properties: {
      type: {
        type: 'string',
        default: 'mssql-external',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-display': 'hidden',
      },
      key: {
        type: 'string',
        title: t('Data source name', { ns: NAMESPACE }),
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true,
      },
      displayName: {
        type: 'string',
        title: t('Display name'),
        default: 'MSSQL',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true,
      },
      options: {
        type: 'object',
        'x-component': 'FormLayout',
        properties: {
          host: {
            type: 'string',
            title: t('Host'),
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            required: true,
          },
          port: {
            type: 'number',
            title: t('Port'),
            default: 1433,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 1,
              max: 65535,
            },
            required: true,
          },
          database: {
            type: 'string',
            title: t('Database'),
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            required: true,
          },
          schema: {
            type: 'string',
            title: t('Schema'),
            default: 'dbo',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          username: {
            type: 'string',
            title: t('Username'),
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            required: true,
          },
          password: {
            type: 'string',
            title: t('Password'),
            'x-decorator': 'FormItem',
            'x-component': 'Password',
            required: true,
          },
          dialectOptions: {
            type: 'object',
            properties: {
              options: {
                type: 'object',
                properties: {
                  encrypt: {
                    type: 'boolean',
                    default: true,
                    title: t('Encrypt connection (SSL/TLS)'),
                    'x-decorator': 'FormItem',
                    'x-component': 'Checkbox',
                  },
                  trustServerCertificate: {
                    type: 'boolean',
                    default: true,
                    title: t('Trust server certificate'),
                    'x-decorator': 'FormItem',
                    'x-component': 'Checkbox',
                  },
                },
              },
            },
          },
        },
      },
      addAllCollections: addAllCollectionsSchema,
      collections: collectionsSchema,
    },
  };

  return (
    <SchemaComponentAny
      schema={schema}
      components={fieldsHelper ? { CollectionsTable: fieldsHelper.CollectionsTable } : {}}
    />
  );
};

export default MssqlDataSourceSettingsForm;
