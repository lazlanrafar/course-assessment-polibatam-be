const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchStudentOutcomeLevel, StoreStudentOutcomeLevel } = require("./student-outcome-level.Repository");

module.exports = {
  GetStudentOutcomeLevel: async (req, res) => {
    try {
      const result = await FetchStudentOutcomeLevel();

      return Ok(res, result, "Successfully get student outcome level");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get student outcome level");
    }
  },
  CreateStudentOutcomeLevel: async (req, res) => {
    try {
      const body = req.body;

      await StoreStudentOutcomeLevel(body);

      return Ok(res, {}, "Successfully create student outcome level");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create student outcome level");
    }
  },
};
