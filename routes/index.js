// const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.Route");
// const userRoute = require("../app/user/user.route");

const rubrikRoute = require("../app/rubrik/rubrik.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);
  // app.use(`${preRoute}/user`, userRoute);

  app.use(`${preRoute}/rubrik`, rubrikRoute);

  // app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
  //   res.json({ user: req.user });
  // });
};
