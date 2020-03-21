"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DockingMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = DockingMongo;
