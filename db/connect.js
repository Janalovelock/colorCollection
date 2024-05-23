const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = async () => {
  try {
    if (_db) {
      console.log("Db is already initialized!");
      return _db;
    }
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client.db();
    console.log("MongoDB Connected");
    return _db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};