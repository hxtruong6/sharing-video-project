import { Col, Row, Space } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Divider } from "antd";
import { Tag } from "antd";
import { randomInt } from "../../utils/commonFuncs";
import styles from "./VideoCard.module.scss";
import React from "react";

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

function VideoCard({ video, isLogged }) {
  const { id, title, sharedUsers, like, dislike, description } = video;

  if (!id) return <></>;

  return (
    <Row key={id} className={styles.VideoCard}>
      <Col span={8}>Image</Col>
      <Col span={14}>
        <Row className={styles.VideoCard__sec1}>
          <Col>
            <div className={styles.VideoCard__title}>{title}</div>
            <Row>
              Shared by:{"  "}
              {sharedUsers?.map((it) => (
                <Tag color={colors[randomInt(0, colors.length)]}>{it}</Tag>
              ))}
            </Row>
            <Row>
              <div className={styles.VideoCard__like}>
                {like} <LikeOutlined />
              </div>
              <div className={styles.VideoCard__like}>
                {dislike} <DislikeOutlined />
              </div>
            </Row>
          </Col>
          {isLogged && (
            <Row>
              <Button
                type="text"
                icon={<LikeOutlined style={{ fontSize: 32 }} />}
              />
              <Button
                type="text"
                icon={<DislikeOutlined style={{ fontSize: 32 }} />}
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
