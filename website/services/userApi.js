import { ApiMethod } from "../utils/constants";
import fetcher from "./fetcher";

class UserApi {
  url = "/user";

  register({ userName, password }) {
    return fetcher(`${this.url}/register`, ApiMethod.POST, {
      userName,
      password,
    });
  }

  login({ userName, password }) {
    return fetcher(`${this.url}/login`, ApiMethod.POST, {
      userName,
      password,
    });
  }
}

export default new UserApi();
