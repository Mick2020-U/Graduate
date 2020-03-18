"use strict";
const PortMainAbl = require("../../abl/port-main-abl.js");

class PortMainController {
  init(ucEnv) {
    return PortMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new PortMainController();
