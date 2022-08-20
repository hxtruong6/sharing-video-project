import { Row } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

const AccountForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      //   labelCol={{
      //     span: 8,
      //   }}
      //   wrapperCol={{
      //     span: 16,
      //   }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="true"
    >
      <Row>
        <Form.Item
          style={{ paddingRight: 8 }}
          //   label="Username"

          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          style={{ paddingRight: 8 }}
          //   label="Password"

          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            ghost
            // type="primary"
            style={{
              backgroundColor: "rgb(1, 56, 138)",
              borderColor: "rgb(1, 56, 138)",
            }}
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default AccountForm;
