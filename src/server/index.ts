import { Plugin } from '@nocobase/server';
import { ExternalMssqlController } from './controllers/ExternalMssqlController';
import { MssqlExternalDataSource } from './data-source/MssqlExternalDataSource';

export class ExternalMssqlServerPlugin extends Plugin {
  async afterLoad() {
    const controller = new ExternalMssqlController();

    this.app?.dataSourceManager?.registerDataSourceType?.('mssql-external', {
      name: 'mssql-external',
      title: 'External MSSQL',
      dataSource: MssqlExternalDataSource,
    });

    this.app?.resourcer?.define?.({
      name: 'external-mssql',
      actions: {
        testConnection: controller.testConnection.bind(controller),
      },
    });
  }
}

export default ExternalMssqlServerPlugin;
