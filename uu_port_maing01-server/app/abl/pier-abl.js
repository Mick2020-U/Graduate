"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/pier-error.js");

const WARNINGS = {
  create: {
    unsupportedKeys: {
      code: `${Errors.CreatePier.UC_CODE}unsupportedKeys`
    }
  },
  list: {
    unsupportedKeys: {
      code: `${Errors.PierList.UC_CODE}unsupportedKeys`
    }
  }
};

class PierAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "pier-types.js"));
    this.dao = DaoFactory.getDao("pier");
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("pierListDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.list.unsupportedKeys.code,
      Errors.PierList.InvalidDtoIn
    );

    const pierList = await this.dao.list(awid, dtoIn.pageInfo);

    let dtoOut = {
      ...pierList,
      uuAppErrorMap
    };

    return dtoOut;
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    let dtoOut = {};
    const validationResult = this.validator.validate("pierCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.create.unsupportedKeys.code,
      Errors.CreatePier.InvalidDtoIn
    );

    dtoIn.awid = awid;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      throw new Errors.Create.PierDaoCreateFailed({ uuAppErrorMap }, { cause: e });
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new PierAbl();
