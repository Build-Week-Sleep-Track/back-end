const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("/users route", () => {
  describe("/get should return users sleep sessions", () => {
    it("should return 401 if no token is present", async () => {
      const failed = await request(server).get("/api/users");

      expect(failed.status).toBe(400);
    });
  });
  it("should return 401 if bad token is passed", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJDaHJpcyIsImlhdCI6MTU4Nzc0MTI1MSwiZXhwIjoxNTg3NzQxODUxfQ.YqA2OGO4itGR4jaaXLnOtmjoDCHlD2ABvOKoHxqSap8";
    const badToken = await request(server)
      .get("/api/users")
      .set("Authorization", token);

    expect(badToken.status).toBe(401);
  });
});
it("should return 200 ok if proper token is present", async () => {
  const user = {
    email: "c@email.com",
    password: "123",
    first_name: "Chirs",
    last_name: "Giroux",
  };
  const register = await request(server).post("/api/auth/register").send(user);
  const login = await request(server)
    .post("/api/auth/login")
    .send({ email: "c@email.com", password: "123" });
  const token = login.body.token;
  const loggedIn = await request(server)
    .get("/api/users")
    .set("Authorization", token);

  expect(loggedIn.status).toBe(200);
  expect(loggedIn.body.sessions).toBeTruthy();

  describe("add a sleep session", () => {
    describe("it should return an error if information is not entered correctly", async () => {
      const register = await request(server)
        .post("/api/auth/register")
        .send(user);
      const login = await request(server)
        .post("/api/auth/login")
        .send({ email: "c@email.com", password: "123" });
      const token = login.body.token;
      const loggedIn = await request(server)
        .get("/api/users")
        .set("Authorization", token);

      it("should allow a user to create a sleep session", async () => {
        const post = {
          start_date: "2020-04-20 11:00:00",
          start_score: 3,
          end_date: "2020-04-21 05:55:20",
          end_score: 3,
          overall_score: 3,
        };
        const register = await request(server)
          .post("/api/auth/register")
          .send(user);
        const login = await request(server)
          .post("/api/auth/login")
          .send({ email: "c@email.com", password: "123" });
        const token = login.body.token;
        const loggedIn = await request(server)
          .post("/api/users")
          .send(post)
          .set("Authorization", token);

        expect(loggedIn.status).toBe(201);
      });

      it("should return logged in user", async () => {
        expect(loggedIn).toBeTruthy();
        expect(loggedIn.body).toBeTruthy();
        expect(logged.body.sleep_start).toBeTruthy();
        expect(loggedIn.body.start_score).toBeTruthy();
        expect(loggedIn.body.sleep_end).toBeTruthy();
        expect(loggedIn.body.end_score).toBeTruthy();
        expect(loggedIn.body.overall_score).toBeTruthy();
      });
    });
  });
  describe("failed post request", async () => {
    it("should return an error if field(s) are missing", async () => {
      const post = {
        start_score: 3,
        end_date: "2020-04-21 05:55:20",
        end_score: 3,
        overall_score: 3,
      };
      const register = await request(server)
        .post("/api/auth/register")
        .send(user);
      const login = await request(server)
        .post("/api/auth/login")
        .send({ email: "c@email.com", password: "123" });
      const token = login.body.token;
      const loggedIn = await request(server)
        .post("/api/users")
        .send(post)
        .set("Authorization", token);

      expect(loggedIn.status).toBe(500);
    });
  });
});
