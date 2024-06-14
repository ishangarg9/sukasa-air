export interface LoginRequest {
  email: string;
}

export interface ReservationRequest {
  seatNumber: number;
  passengerName: string;
  passengerPhone: string;
  passengerAge: number;
}
