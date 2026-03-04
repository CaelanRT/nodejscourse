const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;

  if (resourceUserId.toString() == requestUser.userId) return;

  throw new CustomError.UnauthorizedError("Unauthorized request");
};

module.exports = checkPermissions;
