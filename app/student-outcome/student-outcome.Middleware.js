const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchStudentOutcomeById } = require("./student-outcome.Repository");

module.exports = {
  FormStudentOutcomeMiddleware: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to create student outcome middleware");
    }
  },
  CheckIsStudentOutcomeWasUsed: async (req, res, next) => {
    try {
      const { id } = req.params;

      const student_outcome = await FetchStudentOutcomeById(id);
      if (!student_outcome) return BadRequest(res, {}, "Student outcome not found");

      if (student_outcome._count.rubrik > 0) return BadRequest(res, {}, "Student outcome was used");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to check is student outcome was used");
    }
  },
};
