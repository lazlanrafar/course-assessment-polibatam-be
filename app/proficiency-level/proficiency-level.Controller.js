const { PROFICIENCY_LEVEL } = require("../../constant/constant");
const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  FetchProficiencyLevel,
  StoreProficiencyLevel,
  StoreProficiencyLevelDetail,
  FetchProficiencyLevelById,
  UpdateProficiencyLevelDetail,
  FetchProficiencyLevelDetailById,
} = require("./proficiency-level.Repository");

module.exports = {
  GetProficiencyLevel: async (req, res) => {
    try {
      const result = await FetchProficiencyLevel();

      return Ok(res, result, "Success get proficiency level data");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get proficiency level data");
    }
  },
  GetProficiencyLevelById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FetchProficiencyLevelById(id);

      return Ok(res, result, "Success get proficiency level data");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get proficiency level data");
    }
  },
  GetProficiencyLevelForList: async (req, res) => {
    try {
      const result = await FetchProficiencyLevel();

      result.forEach((item) => {
        item.label = `Level ${item.level} - ${item.description}`;
      });

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
  // ===========================================================================================================
  // PROFICIENCY LEVEL DETAIL
  // ===========================================================================================================
  GetProficiencyLevelDetailById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await FetchProficiencyLevelDetailById(id);

      return Ok(res, result, "Success get proficiency level detail data");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get proficiency level detail data");
    }
  },
  EditProficiencyLevelDetail: async (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;

      await UpdateProficiencyLevelDetail(id, {
        lower_limit: +body.lower_limit,
        upper_limit: +body.upper_limit,
      });

      return Ok(res, {}, "Success update proficiency level detail data");
    } catch (error) {
      return InternalServerError(res, error, "Failed to update proficiency level detail data");
    }
  },
};
