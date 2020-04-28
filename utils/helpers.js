const db = require("../data/dbConfig");

module.exports = {
  //resolves to object with users info and a property called sessions, which is an array of all users sleep_sessions
  allUserInfo(id) {
    const user = db("users").where({ id }).first();
    const sleep_sessions = db("users_sleep").where({ uid: id });

    return Promise.all([user, sleep_sessions]).then(([u, s]) => {
      const obj = {
        user: {
          id: u.id,
          email: u.email,
          first_name: u.first_name,
          last_name: u.last_name,
        },
        sessions: s,
      };
      return obj;
    });
  },
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

  //   userInfo(id) {
  //     return db("users_sleep").where({ uid: id });
  //   },

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

  editSleep1(id, info) {
    return db.raw(
      `select users_sleep set sleep_start=${info.sleep_start}, start_score=${info.start_score}, sleep_end=${info.sleep_end}, end_score=${info.end_score}, overall_score=${info.overall_score} where id=${id}`
    );
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
