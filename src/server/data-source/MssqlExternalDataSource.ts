import Database from '@nocobase/database';
import { DataSource } from '@nocobase/plugin-data-source-manager';
import { authenticateDatabase } from '../utils/authenticateDatabase';

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

    await authenticateDatabase(this.database);
  }

  get collectionManager() {
    return this.database.collectionManager;
  }

  async destroy() {
    if (this.database) {
      await this.database.close();
    }
    await super.destroy();
  }
}
