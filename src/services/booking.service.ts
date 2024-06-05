import { useAxios } from "./main.service";

export class BookingService {
  static async createBooking(data: any) {
    return await useAxios("/booking", "post", data);
  }
  static async getAllBooking() {
    return await useAxios("/booking");
  }
  static async getBookingById(id: number) {
    return await useAxios(`/booking/${id}`);
  }
  static async cancelBooking(id: number, data: any) {
    console.log(data);
    return await useAxios(`/booking/${id}/cancel`, "put", data);
  }

  static async acceptBooking(id: number, data: any) {
    return await useAxios(`/booking/${id}/accept`, "put", data);
  }

  static async updateBooking(id: number, data: any) {
    return await useAxios(`/booking/${id}`, "put", data);
  }
  static async deleteBooking(id: number) {
    return await useAxios(`/booking/${id}`, "delete");
  }
}
