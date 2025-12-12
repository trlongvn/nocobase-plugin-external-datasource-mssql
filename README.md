# NocoBase Plugin - MSSQL External Data Source

A NocoBase plugin that enables connecting to external Microsoft SQL Server databases as data sources.

## Features

- **Server-side Components:**
  - `MssqlExternalDataSource` class that inherits from `DataSource`
  - Initializes a NocoBase Database instance with the 'mssql' dialect
  - Exposes `collectionManager` for full Collection management
  - Controller with `testConnection` API endpoint

- **Client-side Components:**
  - React-based configuration form for MSSQL connection settings
  - Support for connection testing before saving
  - Fields: Host, Port, Database, Schema, Username, Password, SSL options

- **Full Integration:**
  - Complete Collection management capabilities
  - CRUD operations compatibility within NocoBase ecosystem
  - Seamless integration with NocoBase data source manager

## Installation

```bash
npm install @nocobase/plugin-external-datasource-mssql
```

## Configuration

The plugin requires the following connection parameters:

- **Host**: MSSQL server hostname or IP address
- **Port**: Server port (default: 1433)
- **Database**: Database name
- **Schema**: Database schema (default: dbo)
- **Username**: Database user
- **Password**: User password
- **Encrypt**: Enable SSL/TLS encryption (default: true)
- **Trust Server Certificate**: Trust self-signed certificates (default: true)

## Usage

1. Install and enable the plugin in your NocoBase application
2. Navigate to the Data Sources management page
3. Add a new data source and select "Microsoft SQL Server"
4. Fill in the connection details
5. Click "Test Connection" to verify the connection
6. Save the data source configuration
7. The external MSSQL database collections will be available for CRUD operations

## API

### Test Connection

**Endpoint:** `POST /api/external-mssql:testConnection`

**Request Body:**
```json
{
  "host": "localhost",
  "port": 1433,
  "username": "sa",
  "password": "your_password",
  "database": "your_database",
  "schema": "dbo"
}
```

**Response:**
```json
{
  "status": "success"
}
```

## Development

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Development mode with watch
npm run dev
```

## License

MIT
