import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import userApi from "../../services/userApi";
import { ApiStatus, NotifyType } from "../../utils/constants";
import openNotification from "../../utils/notify";

const TYPE_BTN = {
  LOGGIN: "LOGGIN",
  REGISTER: "REGISTER",
};

const AccountForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (typeBtn) => {
    console.log("Finish:", typeBtn, form.getFieldValue());
    const values = form.getFieldValue();
    if (typeBtn === TYPE_BTN.REGISTER) {
      const res = await userApi.register({
        userName: values.username,
        password: values.password,
      });

      if (res?.status === ApiStatus.Success) {
        openNotification("Register successed", NotifyType.Success);
      } else {
        openNotification(
          "Register failed!",
          NotifyType.Error,
          res?.data?.message
        );
      }

      // console.log("xxx res", res);
    }
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      // onFinish={onFinish}
    >
      <Form.Item
        style={{ maxWidth: 200 }}
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        style={{ maxWidth: 200 }}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            name="login"
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
            onClick={() => onFinish(TYPE_BTN.LOGGIN)}
          >
            Log in
          </Button>
        )}
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            // ghost
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
            style={{
              color: "white",
              backgroundColor: "rgb(1, 56, 138)",
              borderColor: "rgb(1, 56, 138)",
            }}
            onClick={() => onFinish(TYPE_BTN.REGISTER)}
          >
            Register
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AccountForm;
