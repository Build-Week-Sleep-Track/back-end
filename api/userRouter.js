const express = require("express");
const router = express.Router();
const Utils = require("../utils/helpers");
const userAuth = require("./userAuthentication");

//GET to a users route, resolves to array of all the users sleep_sessions

router.get("/:id", userAuth, (req, res) => {
  const { id } = req.params;

  Utils.allUserInfo(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

//POST add a sleep_session to a users

router.post("/:id", userAuth, (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const data = { ...body, uid: Number(id) };

  Utils.addUserInfo(data)
    .then((userInfo) => res.status(201).json(userInfo))
    .catch((err) => res.status(500).json({ error: err }));
});

//edits a sleep_session, requires user id and sleep_session id

router.put("/:id/:post_id", userAuth, (req, res) => {
  const { id, post_id } = req.params;
  const body = req.body;

  Utils.editSleepInfo(id, post_id, body)
    .then((updated) => res.status(201).json(updated))
    .catch((err) => res.status(500).json({ error: err }));
});

//deletes a sleep_session, requires user id and sleep_session id

router.delete("/:id/:post_id", userAuth, (req, res) => {
  const { id, post_id } = req.params;
  Utils.deleteSleepSession(id, post_id)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id/dates", userAuth, (req, res) => {
  const { id } = req.decrypted;
  const { start, end } = req.query;

  Utils.findDates(id, start, end)
    .then((dates) => res.status(200).json(dates))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
