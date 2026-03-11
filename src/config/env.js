import dotenv from 'dotenv';

dotenv.config({
    path: '.env.dev'
})

export const BASE_URL = process.env.BASE_URL;
export const DB_PATH = process.env.MONGODB_URI;
export const jwtSecret = process.env.JWTSECRET;
export const jwtExpiresIn = process.env.JWTEXPIRESIN;