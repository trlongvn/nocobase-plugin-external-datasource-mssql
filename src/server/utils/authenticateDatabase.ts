import Database from '@nocobase/database';

export const authenticateDatabase = async (db: Database) => {
  if (typeof (db as any).authenticate === 'function') {
    await (db as any).authenticate();
    return;
  }

  if ((db as any).sequelize) {
    await (db as any).sequelize.authenticate();
  }
};
