const { PROFICIENCY_LEVEL } = require("../../constant/constant");
const { InternalServerError, Ok } = require("../../utils/http-response");
const { FetchProficiencyLevel, StoreProficiencyLevel, StoreProficiencyLevelDetail } = require("./proficiency-level.Repository");

module.exports = {
  GetProficiencyLevel: async (req, res) => {
    try {
      const result = await FetchProficiencyLevel();

      return Ok(res, result, "Success get proficiency level data");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get proficiency level data");
    }
  },
  CreateProficiencyLevel: async (req, res) => {
    try {
      const body = req.body;
      const result = await StoreProficiencyLevel({
        level: parseInt(body.level),
        description: PROFICIENCY_LEVEL[parseInt(body.level)].description,
      });

      for (let i = 0; i <= parseInt(body.level); i++) {
        await StoreProficiencyLevelDetail({
          id_proficiency_level: result.id,
          level: i,
          description: PROFICIENCY_LEVEL[i].description,
        });
      }

      return Ok(res, {}, "Success create proficiency level data");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create proficiency level data");
    }
  },
};
