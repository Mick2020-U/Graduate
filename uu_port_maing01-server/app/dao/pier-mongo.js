"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PierMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async getBoats(awid, id) {
    return await super.db.boat.find({ pierId: id });
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
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }
}

module.exports = PierMongo;
