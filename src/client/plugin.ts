import { Plugin } from '@nocobase/client';
import { MssqlConfigurationForm } from './MssqlConfigurationForm';

export class PluginExternalDatasourceMssqlClient extends Plugin {
  async load() {
    // Register the MSSQL data source configuration form
    this.app.dataSourceManager.addFieldInterfaces({
      mssql: {
        title: 'MSSQL',
        name: 'mssql',
        Component: MssqlConfigurationForm,
      },
    });

    // Register as a data source type
    this.app.dataSourceManager.addDataSourceTypes({
      type: 'mssql',
      title: 'Microsoft SQL Server',
      description: 'Connect to external Microsoft SQL Server database',
      icon: 'DatabaseOutlined',
      ConfigurationForm: MssqlConfigurationForm,
    });
  }
}

export default PluginExternalDatasourceMssqlClient;
