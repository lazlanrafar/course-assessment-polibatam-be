const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchAssessmentMethod, StoreAssessmentMethod } = require("./assessment-method.Repository");

module.exports = {
  GetAssessmentMethod: async (req, res) => {
    try {
      const result = await FetchAssessmentMethod();

      return Ok(res, result, "Successfully get assessment method");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment method");
    }
  },
  CreateAssessmentMethod: async (req, res) => {
    try {
      const body = req.body;

      await StoreAssessmentMethod(body);

      return Ok(res, {}, "Successfully create assessment method");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create assessment method");
    }
  },
};
