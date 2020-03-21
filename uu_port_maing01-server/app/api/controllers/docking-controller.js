"use strict";
const DockingAbl = require("../../abl/docking-abl.js");

class DockingController {

  update(ucEnv) {
    return DockingAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new DockingController();
