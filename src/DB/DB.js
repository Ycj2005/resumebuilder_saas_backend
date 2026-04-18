import mongoose from "mongoose";
import {DB_PATH} from "../config/env.js";

import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

export async function GetDatabaseConnection() {
    try {
        await mongoose.connect(DB_PATH);
        console.log('Database Connected...');
    } catch (error) {
        console.error('db is not connected',error);
    }
}