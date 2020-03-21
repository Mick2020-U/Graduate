"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/captain-error.js");

const WARNINGS = {
  create: {
    unsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`
    }
  },
  list: {
    unsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`
    }
  }
};

class CaptainAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "captain-types.js"));
    this.dao = DaoFactory.getDao("captain");
  }

  async list(awid, dtoIn) {
    const captainList = await this.dao.list(awid, dtoIn.pageInfo);
    let dtoOut = {
      ...captainList
    };

    return dtoOut;
  }

  async create(awid, dtoIn, uuAppErrorMap={}) {
    let dtoOut = {};
    const validationResult = this.validator.validate("captainCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.create.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.awid = awid;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      console.log(e, "error");
      throw new Errors.Create.CaptainDaoCreateFailed({ uuAppErrorMap }, { cause: e });
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new CaptainAbl();
