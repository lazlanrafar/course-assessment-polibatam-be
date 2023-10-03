const { InternalServerError } = require("../../utils/http-response");

module.exports = {
  FormAssessmentMiddleware: (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) req.body.created_by = req.user.nik;

      next();
    } catch (error) {
      return InternalServerError(res, error, "Something went wrong!, in Middleware");
    }
  },
};
