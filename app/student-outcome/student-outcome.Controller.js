const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchStudentOutcome } = require("./student-outcome.Repository");

module.exports = {
  GetStudentOutcome: async (req, res) => {
    try {
      const result = await FetchStudentOutcome();

      return Ok(res, result, "Successfully get student outcome");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get student outcome");
    }
  },
};
