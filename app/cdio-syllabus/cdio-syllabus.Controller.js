const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  FetchRubrikCDIOSyllabus,
  FetchCDIOSyllabusParent,
  StoreCDIOSyllabus,
  FetchRubrikCDIOSyllabusById,
  UpdateCDIOSyllabus,
} = require("./cdio-syllabus.Repository");

module.exports = {
  GetCDIOSyllabus: async (req, res) => {
    try {
      const result = await FetchRubrikCDIOSyllabus();

      result.forEach((item) => {
        item.parent = `${item.cdio_syllabus_parent.level}. ${item.cdio_syllabus_parent.title}`;
      });

      return Ok(res, result, "Successfully get CDIO Syllabus");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to get CDIO Syllabus");
    }
  },
  GetCDIOSyllabusById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchRubrikCDIOSyllabusById(id);

      return Ok(res, result, "Successfully get CDIO Syllabus detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get CDIO Syllabus detail");
    }
  },
  GetCDIOSyllabusParent: async (req, res) => {
    try {
      const result = await FetchCDIOSyllabusParent();

      return Ok(res, result, "Successfully get cdio syllabus");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get cdio syllabus");
    }
  },
  CreateCDIOSyllabus: async (req, res) => {
    try {
      const body = req.body;

      const result = await StoreCDIOSyllabus(body);

      return Ok(res, result, "Successfully create CDIO Syllabus");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create CDIO Syllabus");
    }
  },
  EditCDIOSyllabus: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const result = await UpdateCDIOSyllabus(id, body);

      return Ok(res, result, "Successfully edit CDIO Syllabus");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit CDIO Syllabus");
    }
  },
};
