"use strict";
const PierAbl = require("../../abl/pier-abl.js");

class PierController {

  undock(ucEnv) {
    return PierAbl.undock(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  dock(ucEnv) {
    return PierAbl.dock(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return PierAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  boats(ucEnv) {
    return PierAbl.boats(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  info(ucEnv) {
    return PierAbl.info(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return PierAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return PierAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return PierAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new PierController();
