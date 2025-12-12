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
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
  schema?: string;
  dialectOptions?: DialectOptions;
  logging?: LoggingOption;
};

/**
 * Controller exposing endpoints for the external MSSQL data source namespace.
 */
export class ExternalMssqlController extends Controller {
  /**
   * POST external-mssql:testConnection
   * Validates incoming connection parameters and attempts to authenticate with the target MSSQL instance.
   * Responds with `{ status: 'success' }` on success or `{ status: 'error', message }` with HTTP 400 on failure.
   */
  static async testConnection(ctx: Context) {
    const {
      host,
      port,
      username,
      password,
      database,
      schema,
      dialectOptions,
      logging,
    } = (ctx.request?.body as TestConnectionBody) || {};

    if (!host || !database || !username || !password) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Host, database, username, and password are required to test the connection.',
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
      schema,
      logging,
      dialectOptions,
    });

    try {
      await tempDB.init();
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
