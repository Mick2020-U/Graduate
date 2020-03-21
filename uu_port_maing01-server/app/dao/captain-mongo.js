"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CaptainMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async list(awid, pageInfo = {}) {
    let filter = {
      awid
    };
    return await super.find(filter, pageInfo);
  }
}

module.exports = CaptainMongo;
