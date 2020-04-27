const db = require("../data/dbConfig");

module.exports = {
  //adds user to the user database

  addUser(user) {
    return db("users")
      .insert(user, "id")
      .then(([id]) => db("users").where({ id }));
  },
  //query for matching email

  login(user) {
    return db("users")
      .where({ email: user.email })
      .then((u) => u);
  },

  //resolves to sleep sessions for specified user

  userInfo(id) {
    return db("users_sleep").where({ uid: id });
  },

  //adds user sleep session

  addUserInfo(user) {
    return db("users_sleep")
      .insert(user, "id")
      .then(([id]) =>
        db("users_sleep")
          .where({ uid: user.uid })
          .then((uI) => uI.find((elem) => elem.id === id))
      );
  },
  //query for a users sleep sessions between given d1 and d2 range, used to resolve a weekly outlook of sleep
  findDates(id, d1, d2) {
    return db("users_sleep")
      .where({ uid: id })
      .andWhereBetween("sleep_start", [d1, d2]);
  },

  //query to edit sleep_session data, requires user id, the sleep_session id and the info to update

  editSleepInfo(id, sleep_id, info) {
    return db("users_sleep")
      .update(info, sleep_id)
      .where({ uid: id })
      .then(() => db("users_sleep").where({ id: sleep_id }));
  },

  //deletes a sleep_session, requires user id and sleep_session id
  deleteSleepSession(id, sleep_id) {
    return db("users_sleep")
      .where({ uid: id })
      .andWhere({ id: sleep_id })
      .del()
      .then((deleted) => deleted)
      .catch((err) => err);
  },
};
