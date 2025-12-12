export type MssqlFormValues = {
  host?: string;
  port?: number;
  database?: string;
  schema?: string;
  username?: string;
  password?: string;
  encrypt?: boolean;
  trustServerCertificate?: boolean;
};

export type NormalizedMssqlPayload = Omit<
  MssqlFormValues,
  'encrypt' | 'trustServerCertificate' | 'password'
> & {
  password: string;
  dialectOptions: {
    options: {
      encrypt: boolean;
      trustServerCertificate?: boolean;
    };
  };
};

export const normalizeMssqlPayload = (values: MssqlFormValues): NormalizedMssqlPayload => {
  const { encrypt, trustServerCertificate, password = '', ...rest } = values;
  const options: {
    encrypt: boolean;
    trustServerCertificate?: boolean;
  } = {
    encrypt: !!encrypt,
  };

  if (trustServerCertificate !== undefined) {
    options.trustServerCertificate = Boolean(trustServerCertificate);
  }

  return {
    ...rest,
    password,
    dialectOptions: {
      options,
    },
  };
};
