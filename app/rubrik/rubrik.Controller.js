const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchRubrik, FetchCDIOSyllabus, StoreRubrik } = require("./rubrik.Repository");

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
  GetCDIOSyllabus: async (req, res) => {
    try {
      const result = await FetchCDIOSyllabus();

      return Ok(res, result, "Successfully get cdio syllabus");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get cdio syllabus");
    }
  },
  CreateRubrik: async (req, res) => {
    try {
      const body = req.body;

      const result = await StoreRubrik(body);

      return Ok(res, result, "Successfully create rubrik");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create rubrik");
    }
  },
};
