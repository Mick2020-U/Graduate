"use strict";
const BoatAbl = require("../../abl/boat-abl.js");

class BoatController {

  get(ucEnv) {
    return BoatAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listByPier(ucEnv) {
    return BoatAbl.listByPier(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  // listById(ucEnv) {
  //   return BoatAbl.listById(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  // }

  update(ucEnv) {
    return BoatAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }
  list(ucEnv) {
    return BoatAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  create(ucEnv) {
    return BoatAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult(), ucEnv.getSession());
  }
}

module.exports = new BoatController();
