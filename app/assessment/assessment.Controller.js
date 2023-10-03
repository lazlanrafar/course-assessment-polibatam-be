const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreAssessment, FetchAssessment } = require("./assessment.Repository");

module.exports = {
  GetAssessment: async (req, res) => {
    try {
      const result = await FetchAssessment();

      return Ok(res, result, "Successfully get assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment");
    }
  },
  CreateAssessment: async (req, res) => {
    try {
      const body = req.body;

      await StoreAssessment(body);

      return Ok(res, {}, "Successfully create assessment");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create assessment");
    }
  },
};
