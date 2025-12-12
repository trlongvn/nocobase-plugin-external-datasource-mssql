import { Context } from '@nocobase/actions';
import { MssqlExternalDataSource } from './mssql-data-source';

export class MssqlController {
  /**
   * Test connection to MSSQL database
   * POST /api/mssql:testConnection
   */
  static async testConnection(ctx: Context) {
    const { host, port, user, password, database, schema } = ctx.request.body;

    if (!host || !user || !password || !database) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'Missing required connection parameters',
      };
      return;
    }

    try {
      // Create a temporary data source instance for testing
      const dataSource = new MssqlExternalDataSource({
        host,
        port: port || 1433,
        user,
        password,
        database,
        schema: schema || 'dbo',
      });

      await dataSource.init();
      const isConnected = await dataSource.testConnection();
      await dataSource.close();

      ctx.status = 200;
      ctx.body = {
        success: isConnected,
        message: isConnected
          ? 'Connection successful'
          : 'Connection failed',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.message || 'Connection test failed',
        error: error.toString(),
      };
    }
  }
}
