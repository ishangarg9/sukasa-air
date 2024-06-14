import { MAX_SEATS } from "../constants/seat";
import Reservation, {
  IReservation,
  ReservationStatus,
} from "../models/reservation";

class ReservationService {
  async reserveSeat(reservationData: IReservation, userId?: string) {
    const { seatNumber } = reservationData;
    // seatNumber must be in range of 1 to 300
    if (seatNumber < 1 || seatNumber > MAX_SEATS) {
      throw new Error(
        `Invalid seat number, Please select a seat between 1 to ${MAX_SEATS}.`
      );
    }

    let seat = await Reservation.findOne({ seatNumber });

    if (!seat) {
      seat = await Reservation.create({
        seatNumber,
        status: ReservationStatus.PROCESSING,
        user: userId,
      });
    } else if (
      seat.status === ReservationStatus.RESERVED ||
      seat.status === ReservationStatus.PROCESSING
    ) {
      throw new Error(
        "Seat already reserved or processing. Please try another seat."
      );
    } else {
      await seat.updateOne({
        status: ReservationStatus.PROCESSING,
        user: userId,
      });
    }

    try {
      await seat.updateOne({
        ...reservationData,
        user: userId,
        status: ReservationStatus.RESERVED,
      });
    } catch (e) {
      await seat.updateOne({
        status: ReservationStatus.AVAILABLE,
        user: null,
      });
      throw new Error("Error while saving reservation, Please try again.");
    }
  }

  async resetReservation() {
    await Reservation.deleteMany({});
  }
}

export default new ReservationService();
