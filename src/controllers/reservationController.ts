import ReservationService from "../services/reservationService";
import { ReservationRequest } from "../types/requests";
import {
  errorResponseHandler,
  sucessResponseHandler,
} from "../utils/apiHandler";
import { Request, Response } from "express";

class ReservationController {
  async reserveSeat(req: Request, res: Response) {
    const { seatNumber, passengerAge, passengerName, passengerPhone } =
      req.body as ReservationRequest;
    try {
      // Call the service to reserve the seat
      const reservedAt = new Date();
      await ReservationService.reserveSeat(
        {
          seatNumber,
          passengerAge,
          passengerName,
          passengerPhone,
          reservedAt,
        },
        req.user?._id
      );
      sucessResponseHandler(res, "Seat reserved successfully");
    } catch (e) {
      const error = e as Error;
      errorResponseHandler(res, error.message);
    }
  }

  async resetReservation(req: Request, res: Response) {
    try {
      // Call the service to reset the reservation
      await ReservationService.resetReservation();
      sucessResponseHandler(res, "Reservation reset successfully");
    } catch (e) {
      const error = e as Error;
      errorResponseHandler(res, error.message);
    }
  }
}

export default new ReservationController();
