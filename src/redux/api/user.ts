import $axios from "./config";
import { UserPayloadProps, UserRegPayloadProps } from "../../types/types";

console.log("This is axios...", $axios);
const userAPI = {
  async registerUser(payload: UserRegPayloadProps) {
    return $axios.post("/auth/register", payload);
  },

  async loginUser(payload: UserPayloadProps) {
    return $axios.post("/auth/login", payload);
  },

  async logoutUser() {
    return $axios.post("/auth/logout");
  },

  async getUserInfo() {
    return $axios.get("/users/acct_info");
  },
};
export default userAPI;
