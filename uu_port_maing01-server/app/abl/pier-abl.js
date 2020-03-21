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

  async update(awid, dtoIn) {
    console.log(dtoIn, "========================dtoin");
    try {
      let findPier = await this.dao.get(awid, dtoIn.id);
      if (!findPier) {
        return {
          message: "no pier"
        };
      }
      let { slots, busy } = findPier;
      if (dtoIn.deleteBoat) {
        dtoIn.busy = findPier.busy === 0 ? 0 : findPier.busy - 1;
        dtoIn.empty = findPier.empty + 1;
        let dtoOut = {};
        try {
          dtoOut = await this.dao.update({ ...dtoIn, awid });
        } catch (e) {
          if (e instanceof ObjectStoreError) {
            console.log(e, "err");
          }
          throw e;
        }
        return { ...dtoOut };
      } else if (busy === slots) {
        return {
          message: "no free space"
        };
      }
      dtoIn.busy = findPier.busy + 1;
      dtoIn.empty = findPier.empty - 1;
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        console.log(e, "err");
      }
      throw e;
    }
    let dtoOut = {};
    try {
      dtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        console.log(e, "err");
      }
      throw e;
    }
    return { ...dtoOut };
  }

  async boats(awid, dtoIn) {
    return await this.dao.getBoats(awid, dtoIn.id);
  }

  async info(awid, dtoIn) {
    return await this.dao.get(awid, dtoIn.id);
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
