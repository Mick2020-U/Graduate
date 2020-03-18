"use strict";

const PortMainUseCaseError = require("./port-main-use-case-error.js");
const PIER_ERROR_PREFIX = `${PortMainUseCaseError.ERROR_PREFIX}pier/`;

const Create = {
  UC_CODE: `${PIER_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
