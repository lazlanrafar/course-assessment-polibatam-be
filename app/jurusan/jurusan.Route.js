const { GetJurusan, CreateJurusan, GetJurusanById } = require("./jurusan.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetJurusan);
router.get("/:id", GetJurusanById);
router.post("/", CreateJurusan);

module.exports = router;
