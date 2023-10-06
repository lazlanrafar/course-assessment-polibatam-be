const { GetJurusan } = require("./jurusan.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetJurusan);

module.exports = router;
