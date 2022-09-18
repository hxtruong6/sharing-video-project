import { Row } from "antd";
import React from "react";
import AccountForm from "../Authen/AccountForm";

function UnauthenticatedHeader() {
  return (
    <Row>
      <AccountForm />
    </Row>
  );
}

export default UnauthenticatedHeader;
