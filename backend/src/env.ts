import assert from "assert";
import dotenv from "dotenv";

dotenv.config();

// Just making sure our environment variables are working properly

assert(process.env.DB_CONN_STRING != undefined);
export const DB_CONN_STRING = process.env.DB_CONN_STRING;

assert(process.env.DB_NAME != undefined);
export const DB_NAME = process.env.DB_NAME;

assert(process.env.USERS_COLLECTION_NAME != undefined);
export const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME;

assert(process.env.STATIC_DATA_COLLECTION_NAME != undefined);
export const STATIC_DATA_COLLECTION_NAME = process.env.STATIC_DATA_COLLECTION_NAME;

assert(process.env.MESSAGES_COLLECTION_NAME != undefined);
export const MESSAGES_COLLECTION_NAME = process.env.MESSAGES_COLLECTION_NAME;

assert(process.env.PORT != undefined);
export const PORT = process.env.PORT;

assert(process.env.SECRET_KEY != undefined);
export const SECRET_KEY = process.env.SECRET_KEY;

assert(process.env.DO_SPACES_KEY != undefined);
export const DO_SPACES_KEY = process.env.DO_SPACES_KEY;

assert(process.env.DO_SPACES_SECRET != undefined);
export const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET;

assert(process.env.DO_SPACES_ENDPOINT != undefined);
export const DO_SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT;

assert(process.env.DO_SPACES_NAME != undefined);
export const DO_SPACES_NAME = process.env.DO_SPACES_NAME;

assert(process.env.DO_SPACES_REGION != undefined);
export const DO_SPACES_REGION = process.env.DO_SPACES_REGION;
