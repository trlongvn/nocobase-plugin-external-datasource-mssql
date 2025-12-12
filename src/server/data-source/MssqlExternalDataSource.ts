import Database from '@nocobase/database';
import { DataSource } from '@nocobase/plugin-data-source-manager';

interface MssqlDataSourceOptions {
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
  dialectOptions?: any;
  logging?: any;
  [key: string]: any;
}

export class MssqlExternalDataSource extends DataSource {
  database: Database;

  async init() {
    const {
      database,
      username,
      password,
      host,
      port,
      dialectOptions,
      logging,
      ...rest
    }: MssqlDataSourceOptions = (this.options as MssqlDataSourceOptions) || {};

    this.database = new Database({
      ...rest,
      dialect: 'mssql',
      database,
      username,
      password,
      host,
      port,
      logging,
      dialectOptions,
    });

    if (typeof this.database.authenticate === 'function') {
      await this.database.authenticate();
    } else if (this.database.sequelize) {
      await this.database.sequelize.authenticate();
    }
  }

  get collectionManager() {
    return this.database.collectionManager;
  }

  async destroy() {
    if (this.database) {
      await this.database.close();
    }
    if (super.destroy) {
      await super.destroy();
    }
  }
}
