// External Dependencies
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import { DB_CONN_STRING, DB_NAME, USERS_COLLECTION_NAME } from '../env';

// Global Variables
export const collections: { users?: mongodb.Collection } = {};

export async function connectToDatabase() {
  const client: mongodb.MongoClient = new mongodb.MongoClient(DB_CONN_STRING);

  await client.connect();

  const db: mongodb.Db = client.db(DB_NAME);

  const usersCollection: mongodb.Collection = db.collection(USERS_COLLECTION_NAME);
  
  collections.users = usersCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}

// Initialize Connection