const { GetJurusan, CreateJurusan, GetJurusanById, EditJurusan, DeleteJurusan } = require("./jurusan.Controller");
const { CheckIsJurusanWasUsed } = require("./jurusan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetJurusan);
router.get("/:id", GetJurusanById);
router.post("/", CreateJurusan);
router.put("/:id", EditJurusan);
router.delete("/:id", CheckIsJurusanWasUsed, DeleteJurusan);

module.exports = router;
