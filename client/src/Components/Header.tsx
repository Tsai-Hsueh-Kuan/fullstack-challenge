import React from "react";
import { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { RouteComponentProps } from "@reach/router";
import { Button } from "antd";
import { HomeTwoTone } from "@ant-design/icons";

function Connect() {
  const { activateBrowserWallet, account, deactivate, error } = useEthers();

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return account ? (
    <div style={{ display: "flex" }}>
      <div style={{ fontSize: "20px", marginRight: "20px" }}>
        <div>Logged in: {account}</div>
      </div>
      <Button
        type="primary"
        size="large"
        shape="round"
        ghost={true}
        onClick={() => deactivate()}
      >
        Disconnect
      </Button>
    </div>
  ) : (
    <Button
      type="primary"
      size="large"
      shape="round"
      onClick={() => activateBrowserWallet()}
    >
      Connect
    </Button>
  );
}

const Header = (props: RouteComponentProps) => {
  function homePage() {
    return (
      <a href="/">
        <HomeTwoTone />
      </a>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        height: "110px",
        top: 0,
        zIndex: 900,
        width: "100%",
        background: "white",
        border: "solid 0.1em #F0F0F0",
      }}
    >
      <div style={{ fontSize: "80px", marginLeft: "20px", marginTop: "0px" }}>
        {homePage()}
      </div>
      <div
        style={{ marginLeft: "auto", marginRight: "20px", marginTop: "30px" }}
      >
        {Connect()}
      </div>
    </div>
  );
};
export default Header;
