import { Col } from "antd";
import { Button } from "antd";
import { Row } from "antd";
import { LogoutOutlined, ShareAltOutlined } from "@ant-design/icons";
import styles from "./AuthenticatedHeader.module.scss";
import SharingLinkModal from "../SharingLinkModal";
import { useState } from "react";
import { logout } from "../../utils/commonFuncs";
import { clearToken } from "../../services/fetcher";
import useSWR from "swr";

function AuthenticatedHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: currUser } = useSWR("user", (key) => {
    const value = localStorage.getItem("user");
    return !!value ? JSON.parse(value) : undefined;
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    logout();
    clearToken();
  };

  return (
    <Row className={styles.autHeader}>
      <Col span={8}>
        <Row>
          <div>Welcome </div>
          <div className={styles.autHeader__userName}>{currUser.userName} </div>
        </Row>
      </Col>
      <Col span={8}>
        <Button type="primary" icon={<ShareAltOutlined />} onClick={showModal}>
          Share a video
        </Button>
      </Col>
      <Col span={8}>
        <Button
          type="text"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
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
