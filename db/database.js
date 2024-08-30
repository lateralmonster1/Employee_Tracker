import pkg from 'pg';  // Import the entire pg package
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const { Pool } = pkg;  

const pool = new Pool({
    user: process.env.DB_USER,          
    host: process.env.DB_HOST,          
    database: process.env.DB_DATABASE,  
    password: process.env.DB_PASSWORD,  
    port: process.env.DB_PORT,         
});

export default pool; 
