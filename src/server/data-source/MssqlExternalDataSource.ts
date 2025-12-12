import Database from '@nocobase/database';
import { DataSource } from '@nocobase/plugin-data-source-manager';
import { authenticateDatabase } from '../utils/authenticateDatabase';

type MssqlDialectOptions = {
  options?: {
    encrypt?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
};

type LoggingOption = boolean | ((sql: string, timing?: number) => void);

interface MssqlDataSourceOptions {
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
  dialectOptions?: MssqlDialectOptions;
  logging?: LoggingOption;
  [key: string]: any;
}

export class MssqlExternalDataSource extends DataSource {
  /**
   * Underlying MSSQL database instance created during init and closed in destroy.
   * Exposes the collection manager used for collection CRUD operations.
   */
  database: Database;

  async init() {
    const options = this.options as MssqlDataSourceOptions;
    if (!options) {
      throw new Error('MSSQL data source options are required.');
    }

    const {
      database,
      username,
      password,
      host,
      port,
      dialectOptions,
      logging,
      ...rest
    }: MssqlDataSourceOptions = options;

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
