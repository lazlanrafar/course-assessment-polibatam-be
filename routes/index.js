const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.Route");

const assessmentRoute = require("../app/assessment/assessment.Route");

// SETUP ROUTES
const courseRoute = require("../app/course/course.Route");
const rubrikRoute = require("../app/rubrik/rubrik.Route");
const CDIOSyllabusRoute = require("../app/cdio-syllabus/cdio-syllabus.Route");
const assessmentMethodRoute = require("../app/assessment-method/assessment-method.Route");
const studentOutcomeRoute = require("../app/student-outcome/student-outcome.Route");
const proficiencyLevelRoute = require("../app/proficiency-level/proficiency-level.Route");

// PROGRAM STUDI ROUTES
const jurusanRoute = require("../app/jurusan/jurusan.Route");
const programStudiRoute = require("../app/program-studi/program-studi.Route");

// UTILITY ROUTES
const gradingCategoryRoute = require("../app/grading-category/grading-category.Route");
const assessmentType = require("../app/assessment-type/assessment-type.Route");
const userManagementRoute = require("../app/user-management/user-management.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  app.use(`${preRoute}/assessment`, AuthToken, assessmentRoute);

  // SETUP ROUTES
  app.use(`${preRoute}/course`, AuthToken, courseRoute);
  app.use(`${preRoute}/rubrik`, AuthToken, rubrikRoute);
  app.use(`${preRoute}/cdio-syllabus`, AuthToken, CDIOSyllabusRoute);
  app.use(`${preRoute}/student-outcome`, AuthToken, studentOutcomeRoute);
  app.use(`${preRoute}/proficiency-level`, AuthToken, proficiencyLevelRoute);
  app.use(`${preRoute}/assessment-method`, AuthToken, assessmentMethodRoute);

  // PROGRAM STUDI ROUTES
  app.use(`${preRoute}/jurusan`, AuthToken, jurusanRoute);
  app.use(`${preRoute}/program-studi`, AuthToken, programStudiRoute);

  // UTILITY ROUTES
  app.use(`${preRoute}/grading-category`, AuthToken, gradingCategoryRoute);
  app.use(`${preRoute}/assessment-type`, AuthToken, assessmentType);
  app.use(`${preRoute}/user-management`, AuthToken, userManagementRoute);

  app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
    res.json({ user: req.user });
  });
};
