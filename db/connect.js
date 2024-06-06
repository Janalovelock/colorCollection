// connect.js
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const connectDb = () => {
  return new Promise((resolve, reject) => {
    if (_db) {
      console.log("Db is already initialized!");
      resolve(_db);
    } else {
      MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
          _db = client.db(); // Access the database object from the client
          console.log("MongoDB Connected to database:", _db.databaseName);
          resolve(_db);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  connectDb,
  getDb,
};