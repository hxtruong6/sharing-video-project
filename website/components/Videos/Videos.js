import React, { useEffect, useState } from "react";
import { ApiStatus, NotifyType } from "../../utils/constants";
import openNotification from "../../utils/notify";
import videoApi from "../../services/videoApi";

import VideoCard from "./VideoCard";
import { Pagination } from "antd";
import styles from "./Videos.module.scss";
import SWRKey from "../../utils/swrKey";
import useSWR from "swr";
import fetcher from "../../services/fetcher";
import { getCurrentUser } from "../../utils/commonFuncs";
import { Switch } from "antd";
import { Row } from "antd";

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

  // const { data, mutate } = useSWR(SWRKey.GET_VIDEOS, fetcher);
  const { data: fetcher } = useSWR(SWRKey.GET_VIDEOS, (key) => {
    const value = localStorage.getItem(SWRKey.GET_VIDEOS) === "true";
    localStorage.setItem(SWRKey.GET_VIDEOS, !value ? "true" : "false");
    return !value;
  });

  const { data: currUser } = useSWR("user", (key) => getCurrentUser(), {
    refreshInterval: 500,
  });

  useEffect(() => {
    localStorage.setItem(SWRKey.GET_VIDEOS, true);
  }, []);

  useEffect(() => {
    if (!currUser) {
      setAllPublic(true);
    }

    const fetchVideos = async () => {
      const query =
        !allPublic && currUser
          ? videoApi.getPrivateVideos({ page, perPage })
          : videoApi.getAllPublic({ page, perPage });
      const res = await query;
      if (!res) return;

      const { status, data: resData } = res;

      if (status === ApiStatus.Success) {
        // console.log("xxx 350 videos: ", resData);
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

    fetchVideos();
  }, [allPublic, page, perPage, fetcher, currUser]);

  // console.log("fetcher: ", fetcher, currUser);

  const onPaginationChange = (pagiPage, pagiPageSize) => {
    setPage(pagiPage);
  };

  const onSwitchPrivateVideos = (checked) => {
    if (currUser) {
      setAllPublic(checked);
    } else {
      setAllPublic(true);
    }
  };

  return (
    <div className={styles.videos}>
      <Row className={styles.videos__switch}>
        <Switch
          checked={allPublic}
          onChange={onSwitchPrivateVideos}
          checkedChildren="Public"
          unCheckedChildren="Personal"
        />
      </Row>
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
