const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchStudentOutcomeByCode, FetchStudentOutcomeById } = require("./student-outcome.Repository");

module.exports = {
  FormStudentOutcomeMiddleware: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { code } = req.body;

      if (id) {
        const studentOutcome = await FetchStudentOutcomeById(id);

        if (code !== studentOutcome.code) {
          const checkCode = await FetchStudentOutcomeByCode(code);
          if (checkCode) return BadRequest(res, {}, "Code already exist");
        }
      } else {
        const checkCode = await FetchStudentOutcomeByCode(code);
        if (checkCode) return BadRequest(res, {}, "Code already exist");
      }

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to create student outcome middleware");
    }
  },
};
