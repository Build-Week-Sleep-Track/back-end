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
};
