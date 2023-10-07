const {
  GetProficiencyLevel,
  CreateProficiencyLevel,
  GetProficiencyLevelById,
  EditProficiencyLevelDetail,
  GetProficiencyLevelDetailById,
  GetProficiencyLevelForList,
} = require("./proficiency-level.Controller");

const express = require("express");
const router = express.Router();

router.get("/list", GetProficiencyLevelForList);

router.get("/", GetProficiencyLevel);
router.get("/:id", GetProficiencyLevelById);
router.post("/", CreateProficiencyLevel);

// DETAIL
router.get("/detail/:id", GetProficiencyLevelDetailById);
router.put("/detail/:id", EditProficiencyLevelDetail);

module.exports = router;
