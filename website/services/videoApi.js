import { ApiMethod } from "../utils/constants";
import fetcher from "./fetcher";

class VideoApi {
  url = "/video";

  create({ url }) {
    return fetcher(`${this.url}`, ApiMethod.POST, {
      url,
      description: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    });
  }
}

export default new VideoApi();
