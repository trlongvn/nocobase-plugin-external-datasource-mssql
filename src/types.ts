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
    };
    [key: string]: any;
  };
  logging?: boolean;
}

export type TestConnectionResponse =
  | { status: 'success' }
  | { status: 'error'; message: string };
