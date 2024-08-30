import pkg from 'pg';  // Import the entire pg package
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const { Pool } = pkg;  // Destructure Pool from the imported package

const pool = new Pool({
    user: process.env.DB_USER,          // PostgreSQL username
    host: process.env.DB_HOST,          // Host (usually 'localhost')
    database: process.env.DB_DATABASE,  // Name of the database
    password: process.env.DB_PASSWORD,  // PostgreSQL password
    port: process.env.DB_PORT,          // PostgreSQL port (usually 5432)
});

export default pool;  // Export the pool object for use in other files
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', typeof process.env.DB_PASSWORD);  // Should log 'string'
