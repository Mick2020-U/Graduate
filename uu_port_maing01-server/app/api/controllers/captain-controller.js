"use strict";
const CaptainAbl = require("../../abl/captain-abl.js");

class CaptainController {

  list(ucEnv) {
    return CaptainAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return CaptainAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new CaptainController();
