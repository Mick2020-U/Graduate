"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/docking-error.js");

const WARNINGS = {

};

class DockingAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "docking-types.js"));
    this.dao = DaoFactory.getDao("docking");
  }

  async create(awid, dtoIn) {
    
  }

  async update(awid, dtoIn) {
    
  }

}

module.exports = new DockingAbl();
