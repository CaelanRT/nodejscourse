const { createJWT, isValidToken, attachCookiesToResponse } = require("./jwt");
const { createTokenUser } = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");

// you are directly accessing these two functions so when you import this index.js, you can use . notation
module.exports = {
  createJWT,
  isValidToken,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
};
