const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.Route");

const assessmentMethodRoute = require("../app/assessment-method/assessment-method.Route");
const rubrikRoute = require("../app/rubrik/rubrik.Route");
const studentOutcomeRoute = require("../app/student-outcome/student-outcome.Route");
const studentOutcomeLevelRoute = require("../app/student-outcome-level/student-outcome-level.Route");
const programStudiRoute = require("../app/program-studi/program-studi.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  // SETUP ROUTES
  app.use(`${preRoute}/assessment-method`, AuthToken, assessmentMethodRoute);
  app.use(`${preRoute}/rubrik`, AuthToken, rubrikRoute);
  app.use(`${preRoute}/student-outcome`, AuthToken, studentOutcomeRoute);
  app.use(`${preRoute}/student-outcome-level`, AuthToken, studentOutcomeLevelRoute);
  app.use(`${preRoute}/program-studi`, AuthToken, programStudiRoute);

  app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
    res.json({ user: req.user });
  });
};
