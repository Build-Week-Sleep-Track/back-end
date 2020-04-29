const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("server", () => {
  describe("post request to register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("should return a 201 ok status with correct user info", async () => {
      const user = {
        email: "c@email.com",
        password: "123",
        first_name: "Chirs",
        last_name: "Giroux",
      };
      const send = await request(server).post("/api/auth/register").send(user);

      expect(send.status).toBe(201);
    });
    it("should return a 500 error with missing required field", async () => {
      const user = { email: "c@email.com", password: "123" };
      const failed = await request(server)
        .post("/api/auth/register")
        .send(user);

      expect(failed.status).toBe(500);
    });
  });
});
describe("post request to /login", () => {
  const user = {
    email: "c@email.com",
    password: "123",
    first_name: "Chirs",
    last_name: "Giroux",
  };
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send(user);
  });

  it("should return a token a token wtih successful login", async () => {
    const loggedIn = await request(server)
      .post("/api/auth/login")
      .send({ email: "c@email.com", password: "123" });

    expect(loggedIn.status).toBe(200);
    expect(loggedIn.body.token).toBeTruthy();
  });

  it("should return a 401 if user credentials are incorrect", async () => {
    const wrongUser = await await request(server).post("/api/auth/login").send({
      email: "c@email",
      password: "wrong",
    });

    expect(wrongUser.status).toBe(401);
  });
});
