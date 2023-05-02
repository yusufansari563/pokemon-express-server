import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.fbzrg3u.mongodb.net/?retryWrites=true&w=majority`;
// const MONGO_URL = "mongodb://localhost:27017/pokemon";
const MAX_FETCH_SIZE = 100;
const DEFAULT_FETCH_SIZE = 10;
const DEFAULT_PAGE = 1;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  },
  MAX_FETCH_SIZE,
  DEFAULT_FETCH_SIZE,
  DEFAULT_PAGE
};
