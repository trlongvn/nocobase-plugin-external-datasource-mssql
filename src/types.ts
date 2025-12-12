export interface MssqlConnectionOptions {
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
  schema?: string;
  dialectOptions?: {
    options?: {
      encrypt?: boolean;
      trustServerCertificate?: boolean;
    };
  };
  logging?: boolean;
}

export type TestConnectionResponse =
  | { status: 'success'; message?: string }
  | { status: 'error'; message: string };
