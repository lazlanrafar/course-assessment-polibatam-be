const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchStudentOutcomeLevel } = require("./student-outcome-level.Repository");

module.exports = {
  GetStudentOutcomeLevel: async (req, res) => {
    try {
      const result = await FetchStudentOutcomeLevel();

      return Ok(res, result, "Successfully get student outcome level");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get student outcome level");
    }
  },
};
