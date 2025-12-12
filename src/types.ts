export interface MssqlConnectionOptions {
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
  dialectOptions?: {
    options?: {
      encrypt?: boolean;
    };
    [key: string]: any;
  };
  logging?: boolean;
}

export interface TestConnectionResponse {
  status: 'success' | 'error';
  message?: string;
}
