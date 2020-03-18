"use strict";
const PierAbl = require("../../abl/pier-abl.js");

class PierController {

  create(ucEnv) {
    return PierAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new PierController();
