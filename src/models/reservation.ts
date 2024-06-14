import { Schema, model } from "mongoose";
import { IUser } from "./user";

export enum ReservationStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  PROCESSING = "processing",
}

export interface IReservation {
  seatNumber: number;
  passengerName: string;
  passengerPhone: string;
  passengerAge: number;
  reservedAt: Date;
  user?: IUser | string;
  status?: ReservationStatus;
}

export function isReserved(this: IReservation) {
  return this.status === ReservationStatus.RESERVED;
}

const reservationSchema = new Schema<IReservation>({
  seatNumber: { type: Number, required: true, unique: true },
  passengerName: { type: String, required: isReserved },
  passengerPhone: { type: String, required: isReserved },
  passengerAge: { type: Number, required: isReserved },
  reservedAt: { type: Date, default: Date.now, required: isReserved },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: Object.values(ReservationStatus),
    default: ReservationStatus.AVAILABLE,
  },
});

reservationSchema.index({ seatNumber: 1 });

const Reservation = model<IReservation>("Reservation", reservationSchema);

export default Reservation;
