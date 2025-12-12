# nocobase-plugin-external-datasource-mssql

External Microsoft SQL Server data source plugin for NocoBase. It registers a new `mssql-external` data source type that uses the MSSQL dialect, exposes a `testConnection` API, and provides a client-side configuration form for connecting to an external database.

## Structure

- `src/server/data-source/MssqlExternalDataSource.ts` – wraps `@nocobase/database` with the `mssql` dialect and exposes the collection manager.
- `src/server/controllers/ExternalMssqlController.ts` – API controller to test connection parameters.
- `src/server/index.ts` – registers the data source type and controller namespace.
- `src/client/components/MssqlConfigForm.tsx` – configuration form with Test Connection support.
- `src/client/index.ts` – registers the client-side config component with the data source manager.
