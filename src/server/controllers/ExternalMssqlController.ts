import Database from '@nocobase/database';
import { Controller } from '@nocobase/server';

export class ExternalMssqlController extends Controller {
  async testConnection(ctx) {
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
      if (tempDB.authenticate) {
        await tempDB.authenticate();
      } else if (tempDB.sequelize) {
        await tempDB.sequelize.authenticate();
      }
      ctx.body = { status: 'success' };
    } catch (error: any) {
      ctx.status = 400;
      ctx.body = { status: 'error', message: error?.message };
    } finally {
      await tempDB.close();
    }
  }
}
