import pkg from 'pg'; 
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;  

console.log(process.env)


const pool = new Pool({
    user: process.env.DB_USER,         
    host: process.env.DB_HOST,         
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,  
    port: process.env.DB_PORT,         
});

export default pool; 
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); 
