import { Plugin } from '@nocobase/client';
import MssqlConfigForm from './components/MssqlConfigForm';

export class PluginExternalDatasourceMssqlClient extends Plugin {
  async load() {
    // Register as a data source type
    this.app.dataSourceManager.addDataSourceTypes({
      type: 'mssql-external',
      title: 'Microsoft SQL Server',
      description: 'Connect to external Microsoft SQL Server database',
      icon: 'DatabaseOutlined',
      ConfigurationForm: MssqlConfigForm,
    });
  }
}

export default PluginExternalDatasourceMssqlClient;
