const express = require("express");
const router = express.Router();
const Utils = require("../utils/helpers");
const userAuth = require("./userAuthentication");

//GET to a users route, resolves to array of all the users sleep_sessions

router.get("/", (req, res) => {
  const { id } = req.decrypted;

  Utils.allUserInfo(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

//POST add a sleep_session to a users

router.post("/", (req, res) => {
  const body = req.body;
  const { id } = req.decrypted;
  const data = { ...body, uid: Number(id) };

  Utils.addUserInfo(data)
    .then((userInfo) => res.status(201).json(userInfo))
    .catch((err) => res.status(500).json({ error: err }));
});

//PUT edits a sleep_session, requires user id and sleep_session id

router.put("/:id", (req, res) => {
  console.log(req.body, req.decrypted.id);
  const { id } = req.params;
  const body = req.body;

  Utils.editSleepInfo(id, body)
    .then((updated) => res.status(201).json(updated))
    .catch((err) => res.status(500).json({ error: err }));
});

//DELETE deletes a sleep_session, requires user id and sleep_session id

router.delete("/:post_id", (req, res) => {
  const { post_id } = req.params;
  const { id } = req.decrypted;
  Utils.deleteSleepSession(id, post_id)
    .then((deleted) =>
      deleted
        ? res.status(200).json({
            message: `session with id of ${post_id} successfully deleted`,
          })
        : res.status(404).json({ error: "session not found" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//GET resolves to an array of dates that meet the start and end parameters set in the query string

router.get("/dates", (req, res) => {
  const { id } = req.decrypted;
  const { start, end } = req.query;

  Utils.findDates(id, start, end)
    .then((dates) => res.status(200).json(dates))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
