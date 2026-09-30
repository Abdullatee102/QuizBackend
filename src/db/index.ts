import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

// Configure connection pool with robust cloud-ready defaults
export const pool = new Pool({
  connectionString: databaseUrl,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ...(isProduction || (databaseUrl && databaseUrl.includes('sslmode=require'))
    ? { ssl: { rejectUnauthorized: false } }
    : {}),
});

// Attach error listener so unexpected idle client errors do not become unhandled process crashes
pool.on('error', (err: Error) => {
  logger.error('[DB POOL ERROR] Unexpected error on idle database client:', err);
});

export const db = drizzle(pool);

/**
 * Lightweight PostgreSQL connectivity check performed on startup.
 * Verifies that the database is reachable using "SELECT 1" without running destructive queries.
 */
export async function verifyDatabaseConnection(): Promise<boolean> {
  let client;
  try {
    client = await pool.connect();
    await client.query('SELECT 1');
    logger.info('[DATABASE] PostgreSQL connectivity successfully established and verified.');
    return true;
  } catch (error: any) {
    logger.error(`[DATABASE ERROR] Failed to connect to PostgreSQL: ${error.message}`);
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}