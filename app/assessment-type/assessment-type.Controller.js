const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchAssessmentType } = require("./assessment-type.Repository");

module.exports = {
  GetAssessmentType: async (req, res) => {
    try {
      const result = await FetchAssessmentType();

      return Ok(res, result, "Successfully get assessment type");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get assessment type");
    }
  },
};
