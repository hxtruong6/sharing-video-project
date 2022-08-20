import { Input } from "antd";
import { Button, Modal } from "antd";
import React, { useState } from "react";

const SharingLinkModal = ({
  showModal,
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const onChange = (e) => {
    console.log(e);
  };

  return (
    <Modal
      title="Sharing a scary video to everyone in the world..."
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input placeholder="Input sharing URL" allowClear onChange={onChange} />
    </Modal>
  );
};

export default SharingLinkModal;
