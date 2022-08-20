import { Col } from "antd";
import { Button } from "antd";
import { Row } from "antd";
import { LogoutOutlined, ShareAltOutlined } from "@ant-design/icons";
import styles from "./AuthenticatedHeader.module.scss";

function AuthenticatedHeader() {
  return (
    <Row className={styles.autHeader}>
      <Col span={10}>
        <Row>
          <div>Welcome </div>
          <div className={styles.autHeader__userName}>The Devepe </div>
        </Row>
      </Col>
      <Col span={8}>
        <Button type="primary" icon={<ShareAltOutlined />}>
          Share a video
        </Button>
      </Col>
      <Col span={6}>
        <Button type="text" danger icon={<LogoutOutlined />}>
          Logout
        </Button>
      </Col>
    </Row>
  );
}

export default AuthenticatedHeader;
