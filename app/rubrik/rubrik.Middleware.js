const { InternalServerError } = require("../../utils/http-response");

module.exports = {
  CreateRubrikMiddleware: (req, res, next) => {
    try {
      req.body.level = parseFloat(req.body.level);

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to create rubrik middleware");
    }
  },
};
