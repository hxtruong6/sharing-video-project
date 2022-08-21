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

  update({ id, likeAdd, isPublic }) {
    return fetcher(`${this.url}`, ApiMethod.PUT, { id, likeAdd, isPublic });
  }

  getAllPublic({ page, perPage, playlistUrl }) {
    return fetcher(`${this.url}/public`, ApiMethod.POST, {
      page,
      perPage,
      playlistUrl,
    });
  }
}

export default new VideoApi();
