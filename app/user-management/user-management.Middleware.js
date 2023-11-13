const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchUserByNIP } = require("./user-management.Repository");

module.exports = {
  MiddlewareUserManagementCheckIsUserWasAdmin: async (req, res, next) => {
    try {
      const { nip } = req.params;

      const user = await FetchUserByNIP(nip);
      if (user) return BadRequest(res, null, "User was admin");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to set user as admin middleware");
    }
  },
};
