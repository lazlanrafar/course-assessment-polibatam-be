const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchAssessmentMethod } = require("./assessment-method.Repository");

module.exports = {
  GetAssessmentMethod: async (req, res) => {
    try {
      const result = await FetchAssessmentMethod();

      return Ok(res, result, "Successfully get assessment method");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment method");
    }
  },
};
