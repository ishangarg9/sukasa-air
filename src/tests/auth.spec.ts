import { app } from "..";
import request from "supertest";
import User from "../models/user";

describe("Auth", () => {
  const userModelSpy = jest.spyOn(User, "findOne");
  const userCreateSpy = jest.spyOn(User, "create");
  const userSaveSpy = jest.spyOn(User.prototype, "save");

  afterAll(() => {
    userModelSpy.mockRestore();
  });

  it("should return a token for a valid user", async () => {
    const email = "test@sukasaair.com";
    userModelSpy.mockResolvedValue({ email });
    const response = await request(app).post("/api/v1/login").send({ email });

    expect(userModelSpy).toHaveBeenCalled();

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token");
  });

  it("should create a new user", async () => {
    const email = "test@sukasaair.com";
    userModelSpy.mockResolvedValue(null);
    userCreateSpy.mockResolvedValue({ email } as any);
    userSaveSpy.mockResolvedValue(null);
    const response = await request(app).post("/api/v1/login").send({ email });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token");
  });
});
