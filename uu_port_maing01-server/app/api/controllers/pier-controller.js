"use strict";
const PierAbl = require("../../abl/pier-abl.js");

class PierController {

  list(ucEnv) {
    return PierAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return PierAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new PierController();
