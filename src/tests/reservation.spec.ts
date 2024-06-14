import { app } from "..";
import request from "supertest";
import User from "../models/user";
import Reservation, {
  ReservationStatus,
  isReserved,
} from "../models/reservation";
import * as tokenparser from "../utils/tokenParser";
import mongoose from "mongoose";
import { ADMIN_EMAIL } from "../constants/admin";

describe("Reservation controller", () => {
  const reservationModelSpy = jest.spyOn(Reservation, "findOne");
  const reservationSaveSpy = jest.spyOn(Reservation.prototype, "save");
  const reservationUpdateOneSpy = jest.spyOn(
    Reservation.prototype,
    "updateOne"
  );
  const userModelSpy = jest.spyOn(User, "findById");
  const tokenParserSpy = jest.spyOn(tokenparser, "parseToken");
  const reservationDeleteManySpy = jest.spyOn(Reservation, "deleteMany");

  afterEach(() => {
    jest.resetAllMocks(); // Reset mocked functions after each test
  });

  it("should reserve a seat", async () => {
    tokenParserSpy.mockReturnValue({ id: "666b36f5767f1de87cf0cd3d" });
    userModelSpy.mockResolvedValue({
      email: "test@example.com",
      _id: new mongoose.Types.ObjectId("666b36f5767f1de87cf0cd3d"),
    });
    reservationModelSpy.mockResolvedValue({
      status: ReservationStatus.AVAILABLE,
      updateOne: jest.fn().mockResolvedValue(null),
    });
    reservationSaveSpy.mockResolvedValue(null);
    reservationUpdateOneSpy.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/v1/seat/reserve")
      .set("Authorization", "Bearer test_token")
      .send({
        seatNumber: 1,
        passengerName: "Drake",
        passengerPhone: "1234567890",
        passengerAge: 30,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Seat reserved successfully");
  });

  it("should throw error when trying to book reserved seat", async () => {
    tokenParserSpy.mockReturnValue({ id: "666b36f5767f1de87cf0cd3d" });
    userModelSpy.mockResolvedValue({
      email: "test@example.com",
      _id: new mongoose.Types.ObjectId("666b36f5767f1de87cf0cd3d"),
    });
    reservationModelSpy.mockResolvedValue({
      status: ReservationStatus.RESERVED,
      updateOne: jest.fn().mockResolvedValue(null),
    });
    reservationSaveSpy.mockResolvedValue(null);
    reservationUpdateOneSpy.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/v1/seat/reserve")
      .set("Authorization", "Bearer test_token")
      .send({
        seatNumber: 1,
        passengerName: "Drake",
        passengerPhone: "1234567890",
        passengerAge: 30,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Seat already reserved or processing. Please try another seat."
    );
  });

  it("should throw error when trying to book a processing seat", async () => {
    tokenParserSpy.mockReturnValue({ id: "666b36f5767f1de87cf0cd3d" });
    userModelSpy.mockResolvedValue({
      email: "test@example.com",
      _id: new mongoose.Types.ObjectId("666b36f5767f1de87cf0cd3d"),
    });
    reservationModelSpy.mockResolvedValue({
      status: ReservationStatus.PROCESSING,
      updateOne: jest.fn().mockResolvedValue(null),
    });
    reservationSaveSpy.mockResolvedValue(null);
    reservationUpdateOneSpy.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/v1/seat/reserve")
      .set("Authorization", "Bearer test_token")
      .send({
        seatNumber: 1,
        passengerName: "Drake",
        passengerPhone: "1234567890",
        passengerAge: 30,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Seat already reserved or processing. Please try another seat."
    );
  });

  it("should throw error when non admin tries to reset tickets", async () => {
    tokenParserSpy.mockReturnValue({ id: "666b36f5767f1de87cf0cd3d" });
    userModelSpy.mockResolvedValue({
      email: "test@example.com",
      _id: new mongoose.Types.ObjectId("666b36f5767f1de87cf0cd3d"),
    });
    reservationModelSpy.mockResolvedValue(null);
    reservationSaveSpy.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/v1/seat/reset")
      .set("Authorization", "Bearer YOUR_TEST_TOKEN")
      .send();

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden");
  });

  it("should reset reservation when admin tries to reset", async () => {
    tokenParserSpy.mockReturnValue({ id: "666b36f5767f1de87cf0cd3d" });
    userModelSpy.mockResolvedValue({
      email: ADMIN_EMAIL,
      _id: new mongoose.Types.ObjectId("666b36f5767f1de87cf0cd3d"),
    });
    reservationModelSpy.mockResolvedValue(null);
    reservationSaveSpy.mockResolvedValue(null);
    reservationDeleteManySpy.mockResolvedValue({} as any);

    const response = await request(app)
      .post("/api/v1/seat/reset")
      .set("Authorization", "Bearer YOUR_TEST_TOKEN")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Reservation reset successfully");
  });
});

describe("isReserved", () => {
  it("should return true when status is RESERVED", () => {
    const mockThis = { status: ReservationStatus.RESERVED };
    expect(isReserved.call(mockThis as any)).toBeTruthy();
  });

  it("should return false when status is not RESERVED", () => {
    const mockThis = { status: ReservationStatus.AVAILABLE };
    expect(isReserved.call(mockThis as any)).toBeFalsy();
  });
});
