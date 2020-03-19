"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
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
  },
  deletePier: {
    unsupportedKeys: {
      code: `${Errors.PierList.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    }
  }
};

class PierAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "pier-types.js"));
    this.dao = DaoFactory.getDao("pier");
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("pierDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deletePier.unsupportedKeys.code,
      Errors.DeletePier.InvalidDtoIn
    );
    let dtoOut = {};
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeletePier.PierDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
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
