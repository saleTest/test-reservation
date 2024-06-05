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
    console.log(id);
    // typeof id;
    console.log("acc", AuthService.getAccessToken());
    console.log(AuthService.getRefreshToken());
    return await client.request({
      url: `/restaurant/${id}`,
      method: "get",
    });
  }

  static async getTopRankedRestourant() {
    return await client.request({
      url: `/top-restaurant`,
      method: "get",
    });
  }

  static async addRestourant(data: any) {
    return await useAxios("/restaurant", "post", data);
  }
  static async updateRestarant(id: number, data: any) {
    return await useAxios(`/restaurant/${id}`, "put", data);
  }
  static async deleteRestourant(id: number) {
    return await useAxios(`/restaurant/${id}`, "delete");
  }
}
