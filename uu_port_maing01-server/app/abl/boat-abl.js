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
  updateBoat: {
    unsupportedKeys: {
      code: `${Errors.UpdateBoat.UC_CODE}unsupportedKeys`,
      message: "DtoIn contains unsupported keys."
    },
    boatDoesNotExist: {
      code: `${Errors.UpdateBoat.UC_CODE}boatDoesNotExist`,
      message: "Boat does not exist."
    }
  }
};

class BoatAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "boat-types.js"));
    this.dao = DaoFactory.getDao("boat");
  }

  async delete(awid, dtoIn) {
    // let validationResult = this.validator.validate("pierDeleteDtoInType", dtoIn);
    //
    // let uuAppErrorMap = ValidationHelper.processValidationResult(
    //   dtoIn,
    //   validationResult,
    //   WARNINGS.deletePier.unsupportedKeys.code,
    //   Errors.DeletePier.InvalidDtoIn
    // );
    let dtoOut = {};
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        console.log(e);
      }
      throw e;
    }
    // dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  // async detail(awid, dtoIn) {
  //
  // }

  async get(awid, dtoIn) {
    return await this.dao.get(awid, dtoIn.id);
  }

  async listByPier(awid, dtoIn) {
    return await this.dao.listByPier(awid, dtoIn.id);
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
    dtoIn.insurance = dtoIn.insurance || null;
    let dtoOut;
    try {
      dtoOut = await this.dao.list(awid, dtoIn, sort, order);
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
    dtoIn.insurance = dtoIn.insurance || false;

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
  async update(awid, dtoIn) {
    let data = { ...dtoIn };
    let validationResult = this.validator.validate("boatUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateBoat.unsupportedKeys.code,
      Errors.UpdateBoat.InvalidDtoIn
    );
    let dtoOut = {};
    try {
      let findBoat = await this.dao.get(awid, dtoIn.id);

      if (!findBoat) {
        ValidationHelper.addWarning(
          uuAppErrorMap,
          WARNINGS.updateBoat.boatDoesNotExist.code,
          WARNINGS.updateBoat.boatDoesNotExist.message,
          {
            boatId: dtoIn.id
          }
        );
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateBoat.BoatDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    try {
      console.log(data, "updateObj");
      dtoOut = await this.dao.update({ data, awid });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateBoat.BoatDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    return { ...dtoOut, uuAppErrorMap };
  }
}

module.exports = new BoatAbl();
