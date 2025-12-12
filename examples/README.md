# MSSQL Data Source Plugin Examples

## Basic Usage

### Registering a MSSQL Data Source

```typescript
import { MssqlExternalDataSource } from '@nocobase/plugin-external-datasource-mssql';

// Initialize data source
const dataSource = new MssqlExternalDataSource({
  host: 'localhost',
  port: 1433,
  user: 'sa',
  password: 'YourPassword123',
  database: 'MyDatabase',
  schema: 'dbo',
  encrypt: true,
  trustServerCertificate: true,
});

// Initialize and load
await dataSource.init();
await dataSource.load();

// Access collection manager
const collectionManager = dataSource.collectionManager;
```

### Testing Connection

```typescript
// Test connection before using
const isConnected = await dataSource.testConnection();
if (isConnected) {
  console.log('Connection successful!');
} else {
  console.log('Connection failed!');
}
```

### Using the REST API

```bash
# Test connection
curl -X POST http://localhost:13000/api/mssql:testConnection \
  -H "Content-Type: application/json" \
  -d '{
    "host": "localhost",
    "port": 1433,
    "user": "sa",
    "password": "YourPassword123",
    "database": "MyDatabase",
    "schema": "dbo"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Connection successful"
}
```

## Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| host | string | Yes | - | MSSQL server hostname or IP address |
| port | number | No | 1433 | Server port number |
| user | string | Yes | - | Database username |
| password | string | Yes | - | Database password |
| database | string | Yes | - | Database name |
| schema | string | No | 'dbo' | Database schema |
| encrypt | boolean | No | true | Enable SSL/TLS encryption |
| trustServerCertificate | boolean | No | true | Trust self-signed certificates |
| logging | boolean | No | false | Enable SQL query logging |

## Common Scenarios

### Azure SQL Database

```typescript
const azureDataSource = new MssqlExternalDataSource({
  host: 'myserver.database.windows.net',
  port: 1433,
  user: 'myuser@myserver',
  password: 'YourPassword123',
  database: 'mydatabase',
  encrypt: true,
  trustServerCertificate: false, // Azure uses valid certificates
});
```

### Local Development

```typescript
const localDataSource = new MssqlExternalDataSource({
  host: 'localhost',
  port: 1433,
  user: 'sa',
  password: 'LocalPassword123',
  database: 'TestDB',
  schema: 'dbo',
  encrypt: false, // Can disable for local development
  trustServerCertificate: true,
});
```

### Custom Schema

```typescript
const customSchemaDataSource = new MssqlExternalDataSource({
  host: 'dbserver',
  user: 'appuser',
  password: 'AppPassword123',
  database: 'ProductionDB',
  schema: 'custom_schema', // Use custom schema instead of dbo
});
```

## Collection Management

Once connected, you can manage collections (tables) using the collectionManager:

```typescript
// Get all collections
const collections = await collectionManager.getCollections();

// Get a specific collection
const userCollection = collectionManager.getCollection('users');

// Perform CRUD operations
const repository = collectionManager.getRepository('users');
const users = await repository.find();
```

## Error Handling

```typescript
try {
  await dataSource.init();
  await dataSource.testConnection();
} catch (error) {
  if (error.code === 'ELOGIN') {
    console.error('Authentication failed');
  } else if (error.code === 'ETIMEDOUT') {
    console.error('Connection timeout');
  } else {
    console.error('Connection error:', error.message);
  }
}
```

## Best Practices

1. **Always test the connection** before using it in production
2. **Use environment variables** for sensitive information like passwords
3. **Enable encryption** for production databases
4. **Use specific schemas** to organize your data
5. **Close connections** when done to free up resources

```typescript
// Clean up
await dataSource.close();
```
