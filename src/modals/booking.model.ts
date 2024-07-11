export interface BookingModel {
  _id: string;
  // date: 2024-08-06T00:00:00.000Z,
  time: string;
  guests: number;
  name: string;
  lastname: string;
  restoran: {
    name: string;
  };
  user: string;
  status: string;

  // bookingId: number;
  // guestNumber: number;
  // firstName: string;
  // lastName: string;
  // restoran: {
  //   restaurantId: number;
  //   name: string;
  // };
  // userId: number;
  // status: {
  //   statusId: number;
  //   status: string;
  // };
  // statusId: number;
}
