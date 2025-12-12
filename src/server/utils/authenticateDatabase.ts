import Database from '@nocobase/database';

type AuthenticatableDatabase = Database & {
  authenticate?: () => Promise<unknown>;
  sequelize?: {
    authenticate: () => Promise<unknown>;
  };
};

export const authenticateDatabase = async (db: AuthenticatableDatabase) => {
  if (typeof db.authenticate === 'function') {
    await db.authenticate();
    return;
  }

  if (db.sequelize) {
    await db.sequelize.authenticate();
  }
};
