"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/boat-error.js");

const WARNINGS = {
  createBoat: {
    unsupportedKeys: {
      code: `${Errors.CreateBoat.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    }
  },
  boatList: {
    unsupportedKeys: {
      code: `${Errors.BoatList.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    }
  },
};

class BoatAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "boat-types.js"));
    this.dao = DaoFactory.getDao("boat");
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("boatListDtoInType", dtoIn);
    let sort = dtoIn.hasOwnProperty("sortBy") ? (dtoIn.sortBy === "code" ? "code" : "time") : "code";
    let order = dtoIn.hasOwnProperty("order") ? (dtoIn.order === "asc" ? 1 : -1) : 1;
    dtoIn.pageInfo = dtoIn.pageInfo || { pageIndex: 0, pageSize: 100 };
    dtoIn.pageInfo.pageSize = dtoIn.pageInfo.pageSize || 100;
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.boatList.unsupportedKeys.code,
      Errors.BoatList.InvalidDtoIn
    );
    dtoIn.awid = awid;

    let dtoOut;
    try {
      dtoOut = await this.dao.list(awid, dtoIn.pageInfo, sort, order);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.BoatList.BoatDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("boatCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createBoat.unsupportedKeys.code,
      Errors.CreateBoat.InvalidDtoIn
    );
    dtoIn.awid = awid;
    dtoIn.state = "initial";
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.CreateBoat.BoatDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new BoatAbl();
