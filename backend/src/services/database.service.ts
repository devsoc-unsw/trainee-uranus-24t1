// External Dependencies
import mongodb from "mongodb";
import { DB_CONN_STRING, DB_NAME, MESSAGES_COLLECTION_NAME, STATIC_DATA_COLLECTION_NAME, USERS_COLLECTION_NAME } from "../env";

export const collections: {
  users?: mongodb.Collection,
  staticData?: mongodb.Collection,
  messages?: mongodb.Collection
} = {};

export async function connectToDatabase() {
  const client: mongodb.MongoClient = new mongodb.MongoClient(DB_CONN_STRING);

  await client.connect();

  const db: mongodb.Db = client.db(DB_NAME);

  const usersCollection: mongodb.Collection = db.collection(
    USERS_COLLECTION_NAME,
  );

  const staticDataCollection: mongodb.Collection = db.collection(
    STATIC_DATA_COLLECTION_NAME,
  );

  const messagesCollection: mongodb.Collection = db.collection(
    MESSAGES_COLLECTION_NAME
  );

  collections.users = usersCollection;
  collections.staticData = staticDataCollection;
  collections.messages = messagesCollection;
}

export async function updateStaticData() {
  const courses = [
    "COMP1511", "COMP1521", "COMP1531", "COMP2521", "COMP2511", "COMP3121", "COMP3821", "COMP4121", "COMP4128", "COMP6080", "MATH1081", "MATH1131", "MATH1141", "MATH1231", "MATH1241"
  ];
  const genders = [
    "Male", "Female", "Nonbinary", "Other"
  ];
  const languages = [
    "English", "Chinese", "Hindi", "Spanish", "French", "Arabic", "Bengali", "Portuguese", "Russian", "Indonesian", "German", "Japanese", "Korean", "Other"
  ];
  const programmingLanguages = [
    "Python", "C", "C++", "Java", "C#", "JavaScript", "Visual Basic", "Go", "SQL", "Fortran", "Ruby", "Rust", "Swift", "MATLAB", "HTML", "Other"
  ];
  const wams = [
    "FL", "PS", "CR", "DN", "HD"
  ];
  const hobbies = [
    "Running", "Reading", "Swimming", "Bouldering", "Tennis", "Games", "Piano", "Violin", "Fishing", "Hiking", "Food", "Baking", "Exercise", "Music", "Pirates", "Sleeping", "Gaming", "Bowling", "Drawing", "Movies", "Cartoons", "Cooking"
  ];
  await collections.staticData?.deleteMany({})
  await collections.staticData?.insertOne({ courses, genders, languages, programmingLanguages, wams, hobbies });
}

type staticDataProps = {
  courses: string[];
  genders: string[];
  languages: string[];
  programmingLanguages: string[];
  wams: string[];
  hobbies: string[];
}
let staticData: staticDataProps;
let lastFetch = 0;

export async function getStaticData() {
  // Update local cache if and only if it's been an hour since the last fetch
  if (Date.now() > lastFetch + 3600000) {
    lastFetch = Date.now();
    staticData = await collections.staticData?.findOne() as unknown as staticDataProps;
  }

  return staticData;
}
