"use strict";
const UuPortError = require("./uu-port-error");
const PortMainUseCaseError = require("./port-main-use-case-error.js");
const PIER_ERROR_PREFIX = `${PortMainUseCaseError.ERROR_PREFIX}pier/`;

const CreatePier = {
  UC_CODE: `${PIER_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${CreatePier.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BoatDaoCreateFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${CreatePier.UC_CODE}pierDaoCreateFailed`;
      this.message = "Create pier by pier Dao create failed.";
    }
  }

};

const PierList = {
  UC_CODE: `${PIER_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${PierList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BoatDaoListFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${PierList.UC_CODE}pierDaoCreateFailed`;
      this.message = "list pier by pier Dao create failed.";
    }
  }

};

module.exports = {
  PierList,
  CreatePier
};
