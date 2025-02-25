const express = require('express');
const mssqlClient = require("../db/mssqlClient");
const mongoClient = require("../db/mongoClient");

const router = express.Router();

const test = async (req, res) => {
  const result = await mssqlClient.query('select 1 as number;');
  res.json({ result });
}

function queryUserCollection(filter, options) {
  return mongoClient.db.collection("users").findOne(filter, options);
}

router.get('/test', test);
module.exports = router;
