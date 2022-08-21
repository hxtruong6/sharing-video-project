import { Col, Row, Space } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Divider } from "antd";
import { Tag } from "antd";
import { checkLogged, randomInt } from "../../utils/commonFuncs";
import styles from "./VideoCard.module.scss";
import React from "react";
import videoApi from "../../services/videoApi";
import { ApiStatus, NotifyType } from "../../utils/constants";
import openNotification from "../../utils/notify";

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

const placeHolderText =
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

function VideoCard({ video }) {
  const { id, title, sharedUsers, like, dislike, description } = video;

  if (!id) return <></>;
  const isLogged = checkLogged();

  const onLike = async () => {
    const res = await videoApi.update({ id, likeAdd: 1 });
    const { status, data: resData } = res;

    if (status === ApiStatus.Success) {
      openNotification("Liked", NotifyType.Success);
    } else {
      openNotification("Like is failed", NotifyType.Error, resData?.message);
    }
  };

  const onDislike = async () => {
    const res = await videoApi.update({ id, likeAdd: -1 });
    const { status, data: resData } = res;

    if (status === ApiStatus.Success) {
      openNotification("Disliked", NotifyType.Success);
    } else {
      openNotification("Dislike is failed", NotifyType.Error, resData?.message);
    }
  };

  return (
    <Row key={id} className={styles.VideoCard}>
      <Col span={8}>Image</Col>
      <Col span={14}>
        <Row className={styles.VideoCard__sec1}>
          <Col className={styles.VideoCard__sec1Child}>
            <div className={styles.VideoCard__title}>{title}</div>
            <Row>
              Shared by:{"  "}
              {sharedUsers?.map((it) => (
                <Tag key={it.id} color={colors[randomInt(0, colors.length)]}>
                  {it}
                </Tag>
              ))}
            </Row>
            <Row>
              <div className={styles.VideoCard__like}>
                {like} <LikeOutlined style={{ color: "#6E6EFF" }} />
              </div>
              <div className={styles.VideoCard__like}>
                {dislike} <DislikeOutlined style={{ color: "#FFB76E" }} />
              </div>
            </Row>
          </Col>
          {isLogged && (
            <Row className={styles.VideoCard__likeAction}>
              <Button
                size="large"
                shape="circle"
                style={{ margin: 8 }}
                type="text"
                icon={<LikeOutlined style={{ fontSize: 32 }} />}
                onClick={onLike}
              />
              <Button
                size="large"
                shape="circle"
                style={{ margin: 8 }}
                type="text"
                icon={<DislikeOutlined style={{ fontSize: 32 }} />}
                onClick={onDislike}
              />
            </Row>
          )}
        </Row>
        <Col className={styles.VideoCard__col}>
          <div className={styles.VideoCard__des}>Description:</div>
          <div>{description || placeHolderText}</div>
        </Col>
      </Col>
      <Divider />
    </Row>
  );
}

export default VideoCard;
