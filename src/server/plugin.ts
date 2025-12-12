import { Plugin } from '@nocobase/server';
import { MssqlExternalDataSource } from './data-source/MssqlExternalDataSource';
import { ExternalMssqlController } from './controllers/ExternalMssqlController';

export class PluginExternalDatasourceMssqlServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    // Register the MSSQL data source type
    this.app.dataSourceManager.factory.register(
      'mssql-external',
      MssqlExternalDataSource
    );

    // Register the test connection API endpoint
    this.app.resource({
      name: 'external-mssql',
      actions: {
        testConnection: ExternalMssqlController.testConnection,
      },
    });

    // Define ACL rules for the API
    this.app.acl.allow('external-mssql', 'testConnection', 'loggedIn');
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginExternalDatasourceMssqlServer;
