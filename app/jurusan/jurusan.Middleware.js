const { InternalServerError, BadRequest } = require("../../utils/http-response");
const { FetchJurusanById } = require("./jurusan.Repository");

module.exports = {
  CheckIsJurusanWasUsed: async (req, res, next) => {
    try {
      const { id } = req.params;
      const jurusan = await FetchJurusanById(id);
      if (!jurusan) return BadRequest(res, {}, "Jurusan not found");

      if (jurusan._count.program_studi > 0) return BadRequest(res, {}, "Jurusan was used");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to check is jurusan was used");
    }
  },
};
