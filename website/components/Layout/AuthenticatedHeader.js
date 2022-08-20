import { Col } from "antd";
import { Button } from "antd";
import { Row } from "antd";
import { LogoutOutlined, ShareAltOutlined } from "@ant-design/icons";
import styles from "./AuthenticatedHeader.module.scss";
import SharingLinkModal from "../SharingLinkModal";
import { useState } from "react";

function AuthenticatedHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row className={styles.autHeader}>
      <Col span={10}>
        <Row>
          <div>Welcome </div>
          <div className={styles.autHeader__userName}>The Devepe </div>
        </Row>
      </Col>
      <Col span={8}>
        <Button type="primary" icon={<ShareAltOutlined />} onClick={showModal}>
          Share a video
        </Button>
      </Col>
      <Col span={6}>
        <Button type="text" danger icon={<LogoutOutlined />}>
          Logout
        </Button>
      </Col>
      <SharingLinkModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Row>
  );
}

export default AuthenticatedHeader;
