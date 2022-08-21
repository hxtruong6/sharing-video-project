import React, { useEffect, useState } from "react";
import { ApiStatus, NotifyType } from "../../utils/constants";
import openNotification from "../../utils/notify";
import videoApi from "../../services/videoApi";

import VideoCard from "./VideoCard";
import { Pagination } from "antd";
import styles from "./Videos.module.scss";

const vis = [
  {
    id: 1,
    title: "Video 1",
    like: 23,
    dislike: 9,
    // description: "abcdegfij",
    sharedUsers: ["user1", "user2", "user3"],
  },
  {
    id: 2,
    title: "Video 2",
    like: 253,
    dislike: 89,
    //description: "abcdegfij",
    sharedUsers: ["user1", "user3"],
  },
  {
    id: 3,
    title: "Video 3",
    like: 2,
    dislike: 9,
    //description: "abcdegfij",
    sharedUsers: ["user7", "user2", "user3"],
  },
  {
    id: 4,
    title: "Video 4",
    like: 53,
    dislike: 95,
    //description: "abcdegfij",
    sharedUsers: ["user5", "user2", "user3"],
  },
];

function Videos({ isLogged }) {
  const [allPublic, setAllPublic] = useState(true);
  const [videos, setVideos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    const getAllPublicVideo = async () => {
      const res = await videoApi.getAllPublic({ page, perPage });
      const { status, data: resData } = res;

      if (status === ApiStatus.Success) {
        console.log("xxx 350 videos: ", resData);
        setVideos(resData.videos);
        setTotal(resData.total);
      } else {
        openNotification(
          "Get all public video is error",
          NotifyType.Error,
          resData?.message
        );
      }
    };

    if (allPublic) {
      getAllPublicVideo();
    }
  }, [allPublic, page, perPage]);

  const onPaginationChange = (pagiPage, pagiPageSize) => {
    setPage(pagiPage);
  };

  return (
    <div className={styles.videos}>
      {videos?.map((video) => (
        <VideoCard key={`vic-${video.id}`} video={video} />
      ))}
      <Pagination
        className={styles.videos__pagi}
        current={page}
        total={total}
        pageSize={perPage}
        onChange={onPaginationChange}
      />
    </div>
  );
}

export default Videos;
