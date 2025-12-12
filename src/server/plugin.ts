import { Plugin } from '@nocobase/server';
import { MssqlExternalDataSource } from './mssql-data-source';
import { MssqlController } from './controller';

export class PluginExternalDatasourceMssqlServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    // Register the MSSQL data source type
    this.app.dataSourceManager.factory.register(
      'mssql',
      MssqlExternalDataSource
    );

    // Register the test connection API endpoint
    this.app.resource({
      name: 'mssql',
      actions: {
        testConnection: MssqlController.testConnection,
      },
    });

    // Define ACL rules for the API
    this.app.acl.allow('mssql', 'testConnection', 'loggedIn');
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginExternalDatasourceMssqlServer;
