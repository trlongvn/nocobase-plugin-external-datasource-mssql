import Database from '@nocobase/database';
import { SequelizeDataSource } from '@nocobase/data-source-manager';
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
  database: string;
  username: string;
  password: string;
  host: string;
  port?: number;
  dialectOptions?: MssqlDialectOptions;
  logging?: LoggingOption;
  [key: string]: any;
}

export class MssqlExternalDataSource extends SequelizeDataSource {
  database: Database;

  constructor(options: MssqlDataSourceOptions) {
    const { database, username, password, host, port, dialectOptions, logging, ...rest } = options;
    const dbInstance = new Database({
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

    super({
      ...options,
      collectionManager: {
        database: dbInstance,
      },
    } as any);

    this.database = dbInstance;
  }

  async load() {
    await authenticateDatabase(this.database as any);
    await (this.collectionManager as any)?.sync?.();
  }

  async close() {
    if (this.database?.close) {
      await this.database.close();
    }
  }
}
