const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchRubrikCDIOSyllabusById } = require("./cdio-syllabus.Repository");

module.exports = {
  FormCDIOSyllabusMiddleware: (req, res, next) => {
    try {
      req.body.level = parseFloat(req.body.level);

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to create CDIO Syllabus middleware");
    }
  },
  CheckIsCDIOSyllabusWasUsed: async (req, res, next) => {
    try {
      const { id } = req.params;

      const CDIOSyllabus = await FetchRubrikCDIOSyllabusById(id);
      if (!CDIOSyllabus) return BadRequest(res, {}, "CDIO Syllabus not found");

      if (CDIOSyllabus._count.rubrik > 0) return BadRequest(res, {}, "CDIO Syllabus was used");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to check is CDIO Syllabus was used");
    }
  },
};
