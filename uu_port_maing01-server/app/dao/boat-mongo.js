"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class BoatMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async list(awid, pageInfo, sortBy, order) {
    let sort = {};
    sort[sortBy] = order;
    return await super.find({ awid }, pageInfo, sort);
  }

}

module.exports = BoatMongo;
