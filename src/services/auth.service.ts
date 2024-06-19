import type { AuthModel } from "@/modals/auth.model";
import { client } from "./main.service";
// import jwt from "jsonwebtoken";

export class AuthService {
  public static saveAuth(model: AuthModel) {
    localStorage.clear();
    localStorage.setItem("auth", JSON.stringify(model));
  }

  private static getAuth(): AuthModel {
    const ss = localStorage.getItem("auth");
    if (ss == undefined) throw new Error("NO_LOGIN_DATA");
    return JSON.parse(ss);
  }

  public static getAccessToken() {
    return this.getAuth().access;
  }

  public static getRefreshToken() {
    return this.getAuth().refresh;
  }

  public static getEmail() {
    return this.getAuth().email;
  }

  public static getRole() {
    // console.log(this.getAuth().role);
    return this.getAuth().role;
  }

  public static hasAuth() {
    return localStorage.getItem("auth") != undefined;
  }

  public static clearAuth() {
    localStorage.clear();
  }

  static async SignUp(
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    password: string
  ) {
    try {
      const response = await client.request({
        url: "/user/signup",
        method: "post",
        data: {
          first_name,
          last_name,
          phone_number,
          email,
          password,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to sign up");
    }
  }
}
