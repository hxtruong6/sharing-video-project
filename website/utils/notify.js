import { notification } from "antd";

const openNotification = (message, type, description) => {
  notification[type]({
    message,
    description,
  });
};

export default openNotification;
