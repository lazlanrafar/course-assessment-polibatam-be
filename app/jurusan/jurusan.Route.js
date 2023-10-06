const { GetJurusan, CreateJurusan } = require("./jurusan.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetJurusan);
router.post("/", CreateJurusan);

module.exports = router;
