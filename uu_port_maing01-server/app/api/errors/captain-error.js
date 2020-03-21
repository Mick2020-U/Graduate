"use strict";
const UuPortError = require("./uu-port-error");
const PortMainUseCaseError = require("./port-main-use-case-error.js");
const CAPTAIN_ERROR_PREFIX = `${PortMainUseCaseError.ERROR_PREFIX}captain/`;

const Create = {
  UC_CODE: `${CAPTAIN_ERROR_PREFIX}create/`,
  CaptainDaoCreateFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}pierDaoCreateFailed`;
      this.message = "Create pier by pier Dao create failed.";
    }
  }
};

const List = {
  UC_CODE: `${CAPTAIN_ERROR_PREFIX}list/`
};

module.exports = {
  List,
  Create
};
