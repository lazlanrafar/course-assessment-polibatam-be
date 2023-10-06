const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchJurusan, StoreJurusan, FetchJurusanById, UpdateJurusan } = require("./jurusan.Repository");

module.exports = {
  GetJurusan: async (req, res) => {
    try {
      const result = await FetchJurusan();

      return Ok(res, result, "Successfully get jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get jurusan");
    }
  },
  GetJurusanById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchJurusanById(id);

      return Ok(res, result, "Successfully get jurusan detail");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get jurusan detail");
    }
  },
  CreateJurusan: async (req, res) => {
    try {
      const body = req.body;

      await StoreJurusan(body);

      return Ok(res, null, "Successfully create jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to create jurusan");
    }
  },
  EditJurusan: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      await UpdateJurusan(id, body);

      return Ok(res, null, "Successfully edit jurusan");
    } catch (error) {
      return InternalServerError(res, error, "Failed to edit jurusan");
    }
  },
};
