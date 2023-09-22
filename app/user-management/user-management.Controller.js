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
  GetPegawai: async (req, res) => {
    try {
      const { unit } = req.query;

      const token = await FetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await FetchPolibatam({
        act: "GetSemuaPegawai",
        token: token.data.data.token,
        filter: `unit=${unit}`,
      });

      let data = result.data.data;
      // for (const iterator of result.data.data) {
      //   let isAdmin = iterator.NIP ? await FetchIsAdmin(iterator.NIP) : false;

      //   data.push({
      //     ...iterator,
      //     isAdmin: isAdmin ? true : false,
      //   });
      // }

      return Ok(res, data, "Successfull to fetch all pegawai");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all pegawai");
    }
  },
  GetPegawaiByNIP: async (req, res) => {
    try {
      const token = await FetchPolibatam({
        act: "GetToken",
        secretkey: req.secretkey,
      });

      const result = await FetchPolibatam({
        act: "GetDataByID",
        token: token.data.data.token,
        filter: `nip=${req.params.nip}`,
      });

      return Ok(res, result.data.data[0], "Successfull to fetch pegawai by NIP");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch pegawai by NIP");
    }
  },
};
