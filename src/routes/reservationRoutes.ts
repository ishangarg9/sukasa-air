import { Router } from "express";
import ReservationController from "../controllers/reservationController";
import validateRequestBody from "../middlewares/validationMiddleware";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post(
  "/seat/reserve",
  authMiddleware,
  validateRequestBody([
    "seatNumber",
    "passengerName",
    "passengerPhone",
    "passengerAge",
  ]),
  ReservationController.reserveSeat
);

router.post(
  "/seat/reset",
  authMiddleware,
  adminMiddleware,
  ReservationController.resetReservation
);

export default router;
