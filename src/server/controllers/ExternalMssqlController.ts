import Database from '@nocobase/database';
import { Context, Controller } from '@nocobase/server';
import { authenticateDatabase } from '../utils/authenticateDatabase';

type DialectOptions = {
  options?: {
    encrypt?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
};

type LoggingOption = boolean | ((sql: string, timing?: number) => void);

type TestConnectionBody = {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  dialectOptions?: DialectOptions;
  logging?: LoggingOption;
};

export class ExternalMssqlController extends Controller {
  async testConnection(ctx: Context) {
    const {
      host,
      port,
      username,
      password,
      database,
      dialectOptions,
      logging,
    } = (ctx.request?.body as TestConnectionBody) || {};

    if (!host || !database || !username) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Host, database, and username are required to test the connection.',
      };
      return;
    }

    const tempDB = new Database({
      dialect: 'mssql',
      host,
      port,
      username,
      password,
      database,
      logging,
      dialectOptions,
    });

    try {
      await authenticateDatabase(tempDB);
      ctx.body = { status: 'success' };
    } catch (error: any) {
      ctx.status = 400;
      ctx.body = { status: 'error', message: error?.message };
    } finally {
      await tempDB.close();
    }
  }
}
