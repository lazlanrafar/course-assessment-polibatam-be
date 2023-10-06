const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchGrading } = require("./grading-category.Repository");

module.exports = {
  GetGrading: async (req, res) => {
    try {
      const result = await FetchGrading();

      return Ok(res, result, "Successfully get grading category");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to get grading category");
    }
  },
};
