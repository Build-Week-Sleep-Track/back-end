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
});
