import { Plugin } from '@nocobase/client';
import type { ComponentType } from 'react';
import MssqlConfigForm from './components/MssqlConfigForm';
import MssqlDataSourceSettingsForm from './components/MssqlDataSourceSettingsForm';

export class PluginExternalDatasourceMssqlClient extends Plugin {
  async load() {
    // Client-side registration APIs have changed in NocoBase 1.x; expose the configuration
    // component for host apps to wire manually.
    this.app.addComponents?.({ MssqlConfigForm });

    type RegisterTypeOptions = {
      name: string;
      label: string;
      DataSourceSettingsForm: ComponentType<any>;
    };

    const dataSourceManager = this.app.dataSourceManager as {
      registerType?: (type: string, options: RegisterTypeOptions) => void;
    };
    dataSourceManager?.registerType?.('mssql-external', {
      name: 'mssql-external',
      label: 'Microsoft SQL Server',
      DataSourceSettingsForm: MssqlDataSourceSettingsForm,
    });
  }
}

export default PluginExternalDatasourceMssqlClient;
