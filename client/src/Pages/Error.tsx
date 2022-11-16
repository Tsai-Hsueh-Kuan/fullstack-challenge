import React from "react";
import { RouteComponentProps } from "@reach/router";
import Default from "../Layout/Default";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Error = (props: RouteComponentProps) => {
  return (
    <Default>
      <div>
        <div style={{ display: "flex", fontSize: "80px" }}>
          <text>4</text>
          <QuestionCircleOutlined style={{ marginTop: "22px" }} />
          <div>4</div>
        </div>
        <div style={{ fontSize: "80px" }}>
          <div>Sorry, Page Not Found</div>
        </div>
        <a href="/">
          <div style={{ fontSize: "80px" }}>Back to home</div>
        </a>
      </div>
    </Default>
  );
};

export default Error;
