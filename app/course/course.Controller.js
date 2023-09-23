const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreCourse } = require("./course.Repository");

module.exports = {
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
