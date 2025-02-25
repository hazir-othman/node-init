const { MongoClient } = require('mongodb');

const NODE_ENV = process.env.NODE_ENV && `${process.env.NODE_ENV}`.trim() || "development";

require('dotenv').config({
  path: `../env-files/${NODE_ENV || 'development'}.env`,
});

const url = process.env.MONGO_DATABASE_URL;
const db_name = process.env.MONGO_DATABASE_NAME;

class mongo {
  constructor() {
    console.info("🔗 Connecting to mongo...");
    this.client = new MongoClient(url);
    this.client.connect().then(() => {
      console.info("✅ Mongo connected");
      this.db = this.client.db(db_name);
      this.db.collection("queues").createIndex({ "expired_at": 1 }, { expireAfterSeconds: 0 }); // for queue expiring each day
    });
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(db_name);
  }
  async disconnect() {
    try {
      this.client.close();
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new mongo();
