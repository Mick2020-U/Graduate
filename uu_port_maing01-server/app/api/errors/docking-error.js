"use strict";

const PortMainUseCaseError = require("./port-main-use-case-error.js");
const DOCKING_ERROR_PREFIX = `${PortMainUseCaseError.ERROR_PREFIX}docking/`;

const Update = {
  UC_CODE: `${DOCKING_ERROR_PREFIX}update/`,
  
};

const Create = {
  UC_CODE: `${DOCKING_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create,
  Update
};
