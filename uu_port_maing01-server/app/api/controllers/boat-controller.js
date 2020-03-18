"use strict";
const BoatAbl = require("../../abl/boat-abl.js");

class BoatController {

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
