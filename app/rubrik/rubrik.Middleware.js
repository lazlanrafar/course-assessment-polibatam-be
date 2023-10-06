const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchRubrikById } = require("./rubrik.Repository");

module.exports = {
  CheckIsRubrikWasUsed: async (req, res, next) => {
    try {
      const { id } = req.params;

      const rubrik = await FetchRubrikById(id);
      if (!rubrik) return BadRequest(res, {}, "Rubrik not found");

      if (rubrik._count.course_assessment_plan > 0) return BadRequest(res, {}, "Rubrik was used");
      if (rubrik._count.course_learning_outcome_detail > 0) return BadRequest(res, {}, "Rubrik was used");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to check is rubrik was used");
    }
  },
};
