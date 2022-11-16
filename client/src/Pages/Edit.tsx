import React, { useEffect } from "react";
import { RouteComponentProps, useLocation } from "@reach/router";
import { Form, Input, Button } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_ARTICLE } from "../Utils/Artical";
import { useEthers } from "@usedapp/core";
import Swal from "sweetalert2";
import Default from "../Layout/Default";

const Edit = (props: RouteComponentProps) => {
  const { account } = useEthers();
  const { origin } = useLocation();
  const [createArticle, { error, data }] = useMutation(ADD_ARTICLE);

  useEffect(() => {
    if (error) {
      Swal.fire("An error occurred...", `Error Message: ${error}`, "error");
    }
  }, [error]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.resetFields();
      Swal.fire({
        title: "Article published successfully!",
        text:
          "Detail Page Link:\r>>>" +
          `${origin}/detail/${data.addArticle[0].id}`,
        icon: "success",
        showConfirmButton: true,
      });
    }
  }, [data]);

  const onFinish = (formData: any) => {
    if (!account) {
      Swal.fire("Need to connect the wallet first!");
    } else {
      createArticle({
        variables: { author: account, ...formData },
      });
    }
  };

  return (
    <Default>
      <h3>Post a new article by {account}</h3>
      <Form form={form} name="editArticle" onFinish={onFinish} preserve={false}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
          <Input.TextArea
            typeof="reset"
            rows={1}
            showCount
            maxLength={50}
            value=""
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Content is required",
            },
          ]}
        >
          <Input.TextArea rows={20} showCount maxLength={10000} />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" size="large" shape="round" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Default>
  );
};

export default Edit;
