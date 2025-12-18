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

type AuthenticatableDB = Parameters<typeof authenticateDatabase>[0];

export class MssqlExternalDataSource extends SequelizeDataSource {
  database: AuthenticatableDB;

  static async testConnection(options: MssqlDataSourceOptions) {
    if (!options) {
      throw new Error('Connection options are required to test MSSQL connectivity');
    }

    if (!options.host?.trim()) {
      throw new Error('Host is required to test the connection.');
    }
    if (!options.database?.trim()) {
      throw new Error('Database is required to test the connection.');
    }
    if (!options.username?.trim()) {
      throw new Error('Username is required to test the connection.');
    }
    if (!options.password?.trim()) {
      throw new Error('Password is required to test the connection.');
    }

    const { database, username, password, host, port, dialectOptions, logging, ...rest } = options;

    const tempDB: AuthenticatableDB = new Database({
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

    try {
      await authenticateDatabase(tempDB);
      return true;
    } finally {
      await tempDB.close();
    }
  }

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

    this.database = dbInstance as AuthenticatableDB;
  }

  async load() {
    await authenticateDatabase(this.database);
    await (this.collectionManager as any)?.sync?.();
  }

  async close() {
    if (this.database?.close) {
      await this.database.close();
    }
  }
}
