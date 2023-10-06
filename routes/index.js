const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.Route");

const assessmentRoute = require("../app/assessment/assessment.Route");

// SETUP ROUTES
const courseRoute = require("../app/course/course.Route");
const rubrikRoute = require("../app/rubrik/rubrik.Route");
const assessmentMethodRoute = require("../app/assessment-method/assessment-method.Route");
const assessmentType = require("../app/assessment-type/assessment-type.Route");
const CDIOSyllabusRoute = require("../app/cdio-syllabus/cdio-syllabus.Route");
const studentOutcomeRoute = require("../app/student-outcome/student-outcome.Route");
const studentOutcomeLevelRoute = require("../app/student-outcome-level/student-outcome-level.Route");

const jurusanRoute = require("../app/jurusan/jurusan.Route");
const programStudiRoute = require("../app/program-studi/program-studi.Route");

// UTILITY ROUTES
const userManagementRoute = require("../app/user-management/user-management.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  app.use(`${preRoute}/assessment`, AuthToken, assessmentRoute);

  // SETUP ROUTES
  app.use(`${preRoute}/course`, AuthToken, courseRoute);
  app.use(`${preRoute}/rubrik`, AuthToken, rubrikRoute);
  app.use(`${preRoute}/assessment-method`, AuthToken, assessmentMethodRoute);
  app.use(`${preRoute}/assessment-type`, AuthToken, assessmentType);
  app.use(`${preRoute}/cdio-syllabus`, AuthToken, CDIOSyllabusRoute);
  app.use(`${preRoute}/student-outcome`, AuthToken, studentOutcomeRoute);
  app.use(`${preRoute}/student-outcome-level`, AuthToken, studentOutcomeLevelRoute);

  app.use(`${preRoute}/jurusan`, AuthToken, jurusanRoute);
  app.use(`${preRoute}/program-studi`, AuthToken, programStudiRoute);

  // UTILITY ROUTES
  app.use(`${preRoute}/user-management`, AuthToken, userManagementRoute);

  app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
    res.json({ user: req.user });
  });
};
