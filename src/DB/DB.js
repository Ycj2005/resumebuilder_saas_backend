import mongoose from "mongoose";
import {DB_PATH} from "../config/env.js";

export async function GetDatabaseConnection() {
    try {
        await mongoose.connect(DB_PATH);
        console.log('Database Connected...');
    } catch (error) {
        console.error('db is not connected',error);
    }
}