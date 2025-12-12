import Database from '@nocobase/database';
import { Controller } from '@nocobase/server';
import { authenticateDatabase } from '../utils/authenticateDatabase';

type RequestContext = {
  request: {
    body?: any;
  };
  status?: number;
  body?: any;
};

export class ExternalMssqlController extends Controller {
  async testConnection(ctx: RequestContext) {
    const {
      host,
      port,
      username,
      password,
      database,
      dialectOptions,
      logging,
    } = ctx.request.body || {};

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
