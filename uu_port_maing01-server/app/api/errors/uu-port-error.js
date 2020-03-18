"use strict";
const { UseCaseError } = require("uu_appg01_server").AppServer;

class UuPortError extends UseCaseError {
  static get ERROR_PREFIX() {
    return "uu-port-main/";
  }

  constructor(dtoOut, paramMap = {}, cause = null) {
    if (paramMap instanceof Error) {
      cause = paramMap;
      paramMap = {};
    }

    super({ dtoOut: dtoOut, paramMap: paramMap, status: 400, cause: cause });
  }
}

module.exports = UuPortError;
