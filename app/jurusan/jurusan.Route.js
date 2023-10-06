const { GetJurusan, CreateJurusan, GetJurusanById, EditJurusan } = require("./jurusan.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetJurusan);
router.get("/:id", GetJurusanById);
router.post("/", CreateJurusan);
router.put("/:id", EditJurusan);

module.exports = router;
