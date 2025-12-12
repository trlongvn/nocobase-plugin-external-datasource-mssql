import { DataSource } from '@nocobase/database';
import { Database } from '@nocobase/database';

export interface MssqlConnectionOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  schema?: string;
}

export class MssqlExternalDataSource extends DataSource {
  private db: Database;

  constructor(options: any) {
    super(options);
  }

  async init() {
    // Initialize NocoBase Database instance with mssql dialect
    this.db = new Database({
      dialect: 'mssql',
      host: this.options.host,
      port: this.options.port || 1433,
      username: this.options.user,
      password: this.options.password,
      database: this.options.database,
      dialectOptions: {
        options: {
          encrypt: this.options.encrypt !== false,
          trustServerCertificate: this.options.trustServerCertificate !== false,
        },
      },
      schema: this.options.schema || 'dbo',
      logging: this.options.logging || false,
    });

    await this.db.init();
  }

  async load() {
    await this.db.sync();
  }

  // Expose collectionManager for full Collection management
  get collectionManager() {
    return this.db.collectionManager;
  }

  getDatabase() {
    return this.db;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.db.authenticate();
      return true;
    } catch (error) {
      console.error('MSSQL connection test failed:', error);
      return false;
    }
  }

  async close() {
    if (this.db) {
      await this.db.close();
    }
  }
}
