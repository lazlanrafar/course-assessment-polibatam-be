const { FetchPolibatam } = require("../../utils/fetch-polibatam");
const { Ok, InternalServerError } = require("../../utils/http-response");
const { getRedis, setRedis } = require("../../utils/redis");
const { StoreUser, FetchUser, DestroyUser } = require("./user-management.Repository");

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

      return Ok(res, result.data.data, "Successful to fetch all unit");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch all unit");
    }
  },
  GetPegawai: async (req, res) => {
    try {
      const responseRedis = await getRedis(`clo_polibatam_pegawai`);

      let result = [];
      if (responseRedis) {
        result = JSON.parse(responseRedis);
      } else {
        const token = await FetchPolibatam({
          act: "GetToken",
          secretkey: req.secretkey,
        });

        const responsePolibatam = await FetchPolibatam({
          act: "GetSemuaPegawai",
          token: token.data.data.token,
        });

        await setRedis(`clo_polibatam_pegawai`, JSON.stringify(responsePolibatam.data.data));

        result = responsePolibatam.data.data;
      }

      const list_admin = await FetchUser();
      result = result.map((item) => {
        const user = list_admin.find((admin) => admin.uid === item.NIP);
        return {
          ...item,
          is_admin: user ? true : false,
        };
      });

      return Ok(res, result, "Successful to fetch all pegawai");
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

      return Ok(res, result.data.data[0], "Successful to fetch pegawai by NIP");
    } catch (error) {
      return InternalServerError(res, error, "Failed to fetch pegawai by NIP");
    }
  },
  CreatePegawaiAdmin: async (req, res) => {
    try {
      const { nip } = req.params;

      await StoreUser(nip);

      return Ok(res, null, "Successful to create pegawai admin");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create pegawai admin");
    }
  },
  DeletePegawaiAdmin: async (req, res) => {
    try {
      const { nip } = req.params;

      await DestroyUser(nip);

      return Ok(res, null, "Successful to delete pegawai admin");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete pegawai admin");
    }
  },
};
