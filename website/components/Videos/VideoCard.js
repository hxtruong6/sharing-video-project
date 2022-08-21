import { Col, Row, Button, Divider, Tag } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { getCurrentUser, randomInt } from "../../utils/commonFuncs";
import styles from "./VideoCard.module.scss";
import React, { useEffect, useState } from "react";
import videoApi from "../../services/videoApi";
import { ApiStatus, NotifyType } from "../../utils/constants";
import openNotification from "../../utils/notify";
import useSWR, { useSWRConfig } from "swr";
import SWRKey from "../../utils/swrKey";

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const CustomColors = {
  blue: "#2F65FF",
  pink: "#FF2FCD",
};

const placeHolderText =
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

const LikeType = {
  like: 1,
  dislike: -1,
};

const findCurrSharedUser = (video, userId) =>
  video?.sharedBy?.find((it) => it.userId === userId);

const totalOfLike = (video) =>
  video?.likeStatus?.find((it) => it.like === LikeType.like)?.total || 0;
const totalOfDislike = (video) =>
  video?.likeStatus?.find((it) => it.like === LikeType.dislike)?.total || 0;

function VideoCard({ video }) {
  const { id, title, sharedBy, description, url } = video;
  const { mutate } = useSWRConfig();

  // const [refetch, setRefetch] = useState(false);
  const [currSharedUser, setCurrSharedUser] = useState(undefined);

  const { data: currUser } = useSWR("user", (key) => getCurrentUser());

  useEffect(() => {
    if (currUser) setCurrSharedUser(findCurrSharedUser(video, currUser.id));
    else setCurrSharedUser(undefined);
  }, [video, currUser]);

  // console.log("currSharedUser ", currSharedUser);
  // console.log("currUser: ", currUser);

  const onLike = async () => {
    const res = await videoApi.update({
      id: currSharedUser.videoUserId,
      likeAdd: 1,
    });
    const { status, data: resData } = res;

    if (status === ApiStatus.Success) {
      openNotification("Liked", NotifyType.Success);
      mutate(SWRKey.GET_VIDEOS);
    } else {
      openNotification("Like is failed", NotifyType.Error, resData?.message);
    }
  };

  const onDislike = async () => {
    const res = await videoApi.update({
      id: currSharedUser.videoUserId,
      likeAdd: -1,
    });
    const { status, data: resData } = res;

    if (status === ApiStatus.Success) {
      openNotification("Disliked", NotifyType.Success);
      mutate(SWRKey.GET_VIDEOS);
    } else {
      openNotification("Dislike is failed", NotifyType.Error, resData?.message);
    }
  };

  if (!id) return <></>;

  return (
    <Row key={id} className={styles.VideoCard}>
      <Col span={8}>
        <iframe
          src={`https://www.youtube.com/embed/${url?.split("v=").at(-1)}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="video"
        />
      </Col>
      <Col span={14}>
        <Row className={styles.VideoCard__sec1}>
          <Col className={styles.VideoCard__sec1Child}>
            <div className={styles.VideoCard__title}>
              {title || `Video ${id}`}
            </div>
            <Row>
              Shared by:{"  "}
              {sharedBy?.map((it) => (
                <Tag
                  key={it.userName}
                  color={colors[randomInt(0, colors.length)]}
                >
                  {it.userName}
                </Tag>
              ))}
            </Row>
            <Row>
              <div className={styles.VideoCard__like}>
                {totalOfLike(video)}{" "}
                <LikeOutlined style={{ color: "#6E6EFF" }} />
              </div>
              <div className={styles.VideoCard__like}>
                {totalOfDislike(video)}{" "}
                <DislikeOutlined style={{ color: "#FFB76E" }} />
              </div>
            </Row>
          </Col>
          {currSharedUser && (
            <Row className={styles.VideoCard__likeAction}>
              <Button
                size="large"
                shape="circle"
                style={{
                  margin: 8,
                  visibility: `${
                    currSharedUser.like !== LikeType.dislike
                      ? "visible"
                      : "hidden"
                  }`,
                }}
                type="text"
                icon={
                  <LikeOutlined
                    style={{
                      fontSize: 32,
                      color: `${
                        currSharedUser.like === LikeType.like
                          ? `${CustomColors.blue}`
                          : ""
                      }`,
                    }}
                  />
                }
                onClick={() => {
                  if (currSharedUser.like === LikeType.like) onDislike();
                  else onLike();
                }}
              />
              <Button
                size="large"
                shape="circle"
                style={{
                  margin: 8,
                  visibility: `${
                    currSharedUser.like !== LikeType.like ? "visible" : "hidden"
                  }`,
                }}
                type="text"
                icon={
                  <DislikeOutlined
                    style={{
                      fontSize: 32,
                      color: `${
                        currSharedUser.like === LikeType.dislike
                          ? `${CustomColors.pink}`
                          : ""
                      }`,
                    }}
                  />
                }
                onClick={() => {
                  if (currSharedUser.like === LikeType.dislike) onLike();
                  else onDislike();
                }}
              />
            </Row>
          )}
        </Row>
        <Col className={styles.VideoCard__col}>
          <div className={styles.VideoCard__des}>Description: </div>
          <div>
            {`[${id}] `}
            {description || placeHolderText}
          </div>
        </Col>
      </Col>
      <Divider />
    </Row>
  );
}

export default VideoCard;
