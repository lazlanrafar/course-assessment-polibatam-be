const { FetchPolibatam } = require("../../utils/fetch-polibatam");
const { Ok, InternalServerError } = require("../../utils/http-response");

module.exports = {
  GetUnitPegawai: async (req, res) => {
    try {
      const token = await FetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await FetchPolibatam({
        act: "GetSemuaUnit",
        token: token.data.data.token,
      });

      return Ok(res, result.data.data, "Successfull to fetch all unit");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all unit");
    }
  },
};
