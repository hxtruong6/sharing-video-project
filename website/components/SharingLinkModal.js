import { Input } from "antd";
import { Button, Modal } from "antd";
import React, { useState } from "react";

const SharingLinkModal = ({ isModalVisible, handleOk, handleCancel }) => {
  const [url, setUrl] = useState("");
  const onChange = (e) => {
    // console.log(e);
    setUrl(e.target.value);
  };

  return (
    <Modal
      title="Sharing a scary video to everyone in the world..."
      visible={isModalVisible}
      onOk={() => handleOk(url)}
      onCancel={handleCancel}
    >
      <Input placeholder="Input sharing URL" allowClear onChange={onChange} />
    </Modal>
  );
};

export default SharingLinkModal;
