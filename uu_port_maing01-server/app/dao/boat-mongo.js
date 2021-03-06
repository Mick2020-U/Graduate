"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class BoatMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  getQuery(awid, dtoIn) {
    if (dtoIn.insurance) {
      return {
        awid,
        insurance: dtoIn.insurance
      };
    }
    return { awid };
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }
  async list(awid, dtoIn, sortBy = "id", order = "asc") {
    let sort = {};
    sort[sortBy] = order;
    const query = this.getQuery(awid, dtoIn, sortBy, order);
    return await super.find(query, dtoIn.pageInfo, sort);
  }

  async update(uuObject) {
    let filter = { id: uuObject.data.id, awid: uuObject.awid };

    return await super.findOneAndUpdate(filter, uuObject.data, "NONE");
  }

  async listByPier(awid, dtoIn, sortBy = "id", order = "asc") {
    let sort = {};
    sort[sortBy] = order;
    return await super.find({ pierId: dtoIn.id });
  }
}

module.exports = BoatMongo;
