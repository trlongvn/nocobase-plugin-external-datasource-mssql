export interface MssqlConnectionOptions {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
  schema?: string;
  encrypt?: boolean;
  trustServerCertificate?: boolean;
  logging?: boolean;
}

export interface TestConnectionResponse {
  success: boolean;
  message: string;
  error?: string;
}
