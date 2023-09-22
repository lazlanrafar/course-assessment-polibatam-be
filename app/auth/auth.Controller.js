const { FetchPolibatam } = require("../../utils/fetch-polibatam");
const { BadRequest, Ok, InternalServerError } = require("../../utils/http-response");
const { EncryptToken } = require("../../utils/jwt");

module.exports = {
  Login: async (req, res) => {
    try {
      const body = req.body;

      const resLogin = await FetchPolibatam({
        act: "Login",
        username: body.username,
        password: body.password,
      });

      if (resLogin.data.error_code === 102) {
        return BadRequest(res, {}, resLogin.data.error_desc);
      }

      const result = await FetchPolibatam({
        act: "GetBiodata",
        secretkey: resLogin.data.data.secretkey,
      });

      const token = EncryptToken({
        secretkey: resLogin.data.data.secretkey,
      });

      //   const isAdmin = (await FetchIsAdmin(result.data.data.id)) ? true : false;

      const payload = {
        user: {
          ...result.data.data,
        },
        token,
      };

      return Ok(res, payload, "User logged in successfully");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to login user");
    }
  },
};
