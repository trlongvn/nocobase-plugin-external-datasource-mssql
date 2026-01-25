# @gemvn90/plugin-data-source-mssql

External MSSQL (Microsoft SQL Server) data source plugin for NocoBase.

## Features

### 🔌 External Data Source Integration
- Connect to external Microsoft SQL Server databases
- Automatically introspect and import database schema (tables, columns, types)
- Support for multiple schemas within a single database
- Schema-prefixed collection naming (`schema_tableName`)

### 📊 Collection Management
- **Load All Collections**: Automatically load all tables from the database
- **Selective Loading**: Choose specific tables to import
- **Schema Introspection**: Automatic field type detection and mapping to NocoBase field types
- **Primary Key Detection**: Automatically identifies primary keys from table constraints

### ⚡ Performance Optimizations

#### Cursor-Based Pagination
Optimized for querying large datasets (millions of rows):

```typescript
// Using MssqlRepository.chunkWithCursor()
await repository.chunkWithCursor({
  chunkSize: 1000,
  callback: async (rows) => {
    // Process each chunk
  }
});
```

**Benefits:**
- Avoids `OFFSET/FETCH` performance degradation on deep pages
- Auto-detects best cursor strategy based on table indexes
- Supports composite primary keys and unique indexes
- O(1) complexity regardless of page position

### 🗄️ Data Type Mapping

| MSSQL Type | NocoBase Type | Interface |
|------------|---------------|-----------|
| `int`, `bigint`, `smallint`, `tinyint` | integer | integer |
| `decimal`, `numeric`, `money` | decimal | |
| `float`, `real` | double | |
| `varchar`, `nvarchar`, `char`, `nchar` | string | input / textarea |
| `text`, `ntext` | text | textarea |
| `bit` | boolean | checkbox |
| `date` | date | date |
| `time` | time | time |
| `datetime`, `datetime2`, `smalldatetime` | datetime | datetime |
| `uniqueidentifier` | uuid | input |
| `varbinary`, `binary`, `image` | json | |

### 🕐 DateTime Handling
- Automatic conversion of JavaScript `Date` objects to MSSQL-compatible format
- Timezone-aware date filtering support
- Fixes "Conversion failed when converting date and/or time from character string" errors

### 🔒 Security
- Encrypted connection support (`encrypt` option)
- Configurable connection pooling
- Secure credential handling

## Configuration Options

```typescript
interface MssqlDataSourceOptions {
  host: string;           // Server hostname
  port?: number;          // Port (default: 1433)
  database: string;       // Database name
  username: string;       // SQL Server username
  password: string;       // Password
  schema?: string;        // Default schema (default: 'dbo')
  encrypt?: boolean;      // Use encrypted connection
  tablePrefix?: string;   // Table name prefix filter
  dialectOptions?: {      // Additional Tedious driver options
    options?: {
      trustServerCertificate?: boolean;
      enableArithAbort?: boolean;
    };
  };
  pool?: {                // Connection pool settings
    max?: number;
    min?: number;
    idle?: number;
    acquire?: number;
  };
}
```

## API Endpoints

### Test Connection
```
POST /api/external-mssql:testConnection
```

### List Available Tables (Preview)
```
POST /api/dataSources:readTables
Body: { type: 'mssql', options: { host, database, ... } }
```

### Collection Operations
Standard NocoBase data source collection operations are supported:
- `GET /api/:collectionName:list`
- `GET /api/:collectionName:get`
- `POST /api/:collectionName:create`
- `POST /api/:collectionName:update`
- `POST /api/:collectionName:destroy`

## Requirements

- NocoBase >= 1.0.0
- Microsoft SQL Server 2012 or later
- Node.js >= 18

## Installation

```bash
# From tgz file
yarn pm add ./path/to/gemvn90-plugin-data-source-mssql-x.x.x.tgz

# Then enable the plugin
yarn pm enable @gemvn90/plugin-data-source-mssql
```

## License

AGPL-3.0 / NocoBase Commercial License
