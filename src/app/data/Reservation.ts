export interface Reservation{
  id: number;
  guestId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  guess: any;
  room: any;
}
