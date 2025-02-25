const sqlClient = require('mssql');

class mssql {
  constructor() {
    this.config = {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      server: process.env.DATABASE_SERVER,
      database: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT),
      pool: {
        max: 10,
        min: 1,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };
    console.info("🔗 Connecting to mssql...");
    this.pool = new sqlClient.ConnectionPool(this.config);
    this.poolConnect = this.pool.connect();

    this.poolConnect
      .then(() => console.info("✅ mssql connected"))
      .catch((err) => console.error(err))
  }

  async query(query) {
    try {
      await this.poolConnect;
      const result = await this.pool.request().query(query);
      return result.recordset;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = new mssql();