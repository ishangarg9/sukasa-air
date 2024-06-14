import mongoose from "mongoose";
import connectDB from "../db/connectDB";

jest.mock("mongoose", () => {
  const mongoose = jest.requireActual("mongoose");
  return new mongoose.Mongoose();
});

describe("connectDB", () => {
  it("should reuse mongo connection if present", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    Object.defineProperty(mongoose.connection, "readyState", {
      get: jest.fn(() => 1),
    });

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith("Reusing mongo connection");
  });
});
