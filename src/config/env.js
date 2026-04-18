import fs from 'fs';
import dotenv from 'dotenv';

const envPath = fs.existsSync('.env')
  ? '.env'
  : fs.existsSync('.env.dev')
  ? '.env.dev'
  : undefined;

if (envPath) {
  dotenv.config({ path: envPath });
} else {
  throw new Error('Missing env file: create .env or .env.dev');
}

export const BASE_URL = process.env.BASE_URL;
export const DB_PATH = process.env.MONGODB_URI;
export const jwtSecret = process.env.JWTSECRET;
export const jwtExpiresIn = process.env.JWTEXPIRESIN;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;