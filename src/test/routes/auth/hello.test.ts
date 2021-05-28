import request from "supertest";
import { app } from "../../../app";

it("responds with {hi:there} message", async () => {
  const cookie = await global.login();

  const response = await request(app)
    .get("/api/v1/users/hello")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.hi).toEqual("there");
});

it("responds 401 if not authenticated", async () => {
  const response = await request(app)
    .get("/api/v1/users/hello")
    .send()
    .expect(401);
});
