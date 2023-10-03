const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreAssessment } = require("./assessment.Repository");

module.exports = {
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
