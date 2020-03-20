"use strict";
const UuPortError = require("./uu-port-error");
const PortMainUseCaseError = require("./port-main-use-case-error.js");
const BOAT_ERROR_PREFIX = `${PortMainUseCaseError.ERROR_PREFIX}boat/`;

const CreateBoat = {
  UC_CODE: `${BOAT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${CreateBoat.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BoatDaoCreateFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${CreateBoat.UC_CODE}boatDaoCreateFailed`;
      this.message = "Create boat by boat Dao create failed.";
    }
  }

};

const BoatList = {
  UC_CODE: `${BOAT_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${BoatList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BoatDaoListFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${BoatList.UC_CODE}boatDaoCreateFailed`;
      this.message = "Create boat by boat Dao create failed.";
    }
  }
};

const UpdateBoat = {
  UC_CODE: `${BOAT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateBoat.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BoatDaoUpdateFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateBoat.UC_CODE}boatDaoUpdateFailed`;
      this.message = "Update boat by boat Dao update failed.";
    }
  },
  BoatDaoGetFailed: class extends UuPortError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateBoat.UC_CODE}boatDaoGetFailed`;
      this.message = "Get boat by boat Dao get failed.";
    }
  }

};

const ListById = {
  UC_CODE: `${BOAT_ERROR_PREFIX}listById/`,
  
};

const ListByPier = {
  UC_CODE: `${BOAT_ERROR_PREFIX}listByPier/`,
  
};

const Get = {
  UC_CODE: `${BOAT_ERROR_PREFIX}get/`,
  
};

module.exports = {
  Get,
  ListByPier,
  ListById,
  UpdateBoat,
  BoatList,
  CreateBoat
};
