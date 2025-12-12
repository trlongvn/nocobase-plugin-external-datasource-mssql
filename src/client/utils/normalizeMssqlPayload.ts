export type MssqlFormValues = {
  host?: string;
  port?: number;
  database?: string;
  schema?: string;
  username?: string;
  password: string;
  encrypt?: boolean;
  trustServerCertificate?: boolean;
};

export type NormalizedMssqlPayload = Omit<MssqlFormValues, 'encrypt' | 'trustServerCertificate'> & {
  dialectOptions: {
    options: {
      encrypt: boolean;
      trustServerCertificate?: boolean;
    };
  };
};

export const normalizeMssqlPayload = (values: MssqlFormValues): NormalizedMssqlPayload => {
  const { encrypt, trustServerCertificate, ...rest } = values;
  const options: {
    encrypt: boolean;
    trustServerCertificate?: boolean;
  } = {
    encrypt: !!encrypt,
  };

  if (typeof trustServerCertificate !== 'undefined') {
    options.trustServerCertificate = !!trustServerCertificate;
  }

  return {
    ...rest,
    dialectOptions: {
      options,
    },
  };
};
