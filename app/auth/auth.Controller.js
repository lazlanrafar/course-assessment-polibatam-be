const { FetchPolibatam } = require("../../utils/fetch-polibatam");
const {
  BadRequest,
  Ok,
  InternalServerError,
} = require("../../utils/http-response");
const { EncryptToken } = require("../../utils/jwt");
const {
  FetchUserIsAdminByNIP,
} = require("../user-management/user-management.Repository");

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

      if (result.data.data.role === "Mahasiswa")
        return BadRequest(res, {}, "Mahasiswa cannot login");

      const token = EncryptToken({
        secretkey: resLogin.data.data.secretkey,
      });

      // console.log(result.data.data);
      const payload = {
        user: {
          ...result.data.data,
          is_admin: await FetchUserIsAdminByNIP(result.data.data.id),
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
