const express = require("express");
const router = express.Router();
const Utils = require("../utils/helpers");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Utils.userInfo(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const data = { ...body, uid: Number(id) };

  Utils.addUserInfo(data)
    .then((userInfo) => res.status(201).json(userInfo))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id/dates", (req, res) => {
  const { id } = req.decrypted;
  const { start, end } = req.query;

  Utils.findDates(id, start, end)
    .then((dates) => res.status(200).json(dates))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
