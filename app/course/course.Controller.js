const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreCourse, FetchCourse, FetchCourseById } = require("./course.Repository");

module.exports = {
  GetCourse: async (req, res) => {
    try {
      const result = await FetchCourse();

      return Ok(res, result, "Successfully get course");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get course");
    }
  },
  GetCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchCourseById(id);

      return Ok(res, result, "Successfully get course");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get course");
    }
  },
  CreateCourse: async (req, res) => {
    try {
      const body = req.body;

      await StoreCourse(body);

      return Ok(res, {}, "Course created successfully!");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Something went wrong!");
    }
  },
};
