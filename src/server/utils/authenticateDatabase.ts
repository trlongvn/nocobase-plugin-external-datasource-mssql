import Database from '@nocobase/database';

type AuthenticatableDatabase = Database & {
  authenticate?: () => Promise<void>;
  sequelize?: {
    authenticate: () => Promise<void>;
  };
};

export const authenticateDatabase = async (db: AuthenticatableDatabase): Promise<void> => {
  if (typeof db.authenticate === 'function') {
    await db.authenticate();
    return;
  }

  if (db.sequelize) {
    await db.sequelize.authenticate();
    return;
  }

  throw new Error('No authenticate method available on database instance');
};
