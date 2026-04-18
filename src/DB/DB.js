import mongoose from "mongoose";
import dns from "dns";
import {DB_PATH} from "../config/env.js";

// Override DNS to use Google's public DNS to avoid ECONNREFUSED on local network querySrv resolutions
dns.setServers(['8.8.8.8']);

export async function GetDatabaseConnection() {
    try {
        await mongoose.connect(DB_PATH);
        console.log('Database Connected...');
    } catch (error) {
        console.error('db is not connected',error);
    }
}