const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.Route");

const rubrikRoute = require("../app/rubrik/rubrik.Route");
const studentOutcomeRoute = require("../app/student-outcome/student-outcome.Route");
const studentOutcomeLevelRoute = require("../app/student-outcome-level/student-outcome-level.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  app.use(`${preRoute}/rubrik`, AuthToken, rubrikRoute);
  app.use(`${preRoute}/student-outcome`, AuthToken, studentOutcomeRoute);
  app.use(`${preRoute}/student-outcome-level`, AuthToken, studentOutcomeLevelRoute);

  app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
    res.json({ user: req.user });
  });
};
