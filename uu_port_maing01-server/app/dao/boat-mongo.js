"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class BoatMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(awid, dtoIn, sortBy = "id", order = "asc") {
    let sort = {};
    sort[sortBy] = order;
    // TODO need to make it by one query
    if (dtoIn.insurance) {
      return await super.find({
        $and: [{ $or: [{ awid }, dtoIn.pageInfo, sort] }, { $or: [{ insurance: dtoIn.insurance }] }]
      });
    }
    return await super.find({ awid }, dtoIn.pageInfo, sort);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };

    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = BoatMongo;
