const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchRubrik, FetchCDIOSyllabus, StoreRubrik, FetchRubrikById, UpdateRubrik } = require("./rubrik.Repository");

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
  GetRubrikById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchRubrikById(id);

      return Ok(res, result, "Successfully get rubrik detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get rubrik detail");
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
  EditRubrik: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const result = await UpdateRubrik(id, body);

      return Ok(res, result, "Successfully edit rubrik");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit rubrik");
    }
  },
};
