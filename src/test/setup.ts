import request from "supertest";
import { app } from "../app";
import { Context } from "./context";

declare global {
  namespace NodeJS {
    interface Global {
      login(): Promise<string[]>;
    }
  }
}

let context: Context | undefined;

beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context?.reset();
});

afterAll(async () => {
  await context?.close();
});

global.login = async () => {
  const authResponse = await request(app)
    .post("/api/v1/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      username: "test",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");
  return cookie;
};
