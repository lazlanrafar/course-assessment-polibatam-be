const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchRubrik } = require("./rubrik.Repository");

module.exports = {
  GetRubrik: async (req, res) => {
    try {
      const result = await FetchRubrik();

      result.forEach((rubrik) => {
        rubrik.parent = `${rubrik.cdio_syllabus.level}. ${rubrik.cdio_syllabus.title}`;
      });

      return Ok(res, result, "Successfully get rubrik");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get rubrik");
    }
  },
};
