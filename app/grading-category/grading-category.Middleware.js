const { InternalServerError } = require("../../utils/http-response");

module.exports = {
  FormGradingCategoryMiddleware: (req, res, next) => {
    try {
      req.body.lower_limit = parseFloat(req.body.lower_limit);
      req.body.upper_limit = parseFloat(req.body.upper_limit);

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed in middleware grading category");
    }
  },
};
