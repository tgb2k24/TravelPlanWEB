import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

interface MongooseConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Global caching for development to prevent exhausting database connections
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            family: 4, // Force IPv4
            serverSelectionTimeoutMS: 10000, // Timeout after 10s
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e: any) {
        cached.promise = null;
        console.error("❌ MongoDB Connection Error:", e.message);

        if (e.name === "MongooseServerSelectionError") {
            console.error("⚠️  Likely invalid IP Whitelist in MongoDB Atlas.");
            console.error("👉 Please add your current IP to the whitelist at: https://cloud.mongodb.com/");
        }

        throw e;
    }

    return cached.conn;
}

export default connectDB;
