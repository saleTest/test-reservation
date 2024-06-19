import { AuthService } from "./auth.service";
import { client, useAxios } from "./main.service";

export class RestaurantService {
  static async getAllRestaurant() {
    return await client.request({
      url: "/restaurant",
      method: "get",
    });
  }

  static async getRestaurantById(id: any) {
    // console.log(id);
    // // typeof id;
    // console.log("getAccessToken", AuthService.getAccessToken());
    // console.log("getRefreshToken", AuthService.getRefreshToken());
    return await client.request({
      url: `/restaurant/${id}`,
      method: "get",
    });
  }

  // static async getRestaurantById(id: number, data: any) {
  //   return await useAxios(`/restaurant/${id}`, "get", data);
  // }

  static async getTopRankedRestourant() {
    return await client.request({
      url: `/top-restaurant`,
      method: "get",
    });
  }

  static async addRestourant(data: any) {
    return await useAxios("/restaurant", "post", data);
  }
  static async updateRestarant(id: any, data: any) {
    return await useAxios(`/restaurant/${id}`, "put", data);
  }
  static async deleteRestourant(id: any) {
    return await useAxios(`/restaurant/${id}`, "delete");
  }
}
