import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "@reach/router";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../Utils/Artical";
import Swal from "sweetalert2";
import Default from "../Layout/Default";

const Detail = (props: RouteComponentProps) => {
  const params = useParams();
  const { id } = params;

  const [article, setArticle] = useState({
    id: "",
    author: "",
    title: "",
    content: "",
    createdAt: "",
  });

  const { error, data, refetch } = useQuery(GET_ARTICLE, {
    variables: { id },
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (error) {
      Swal.fire("An error occurred...", `Error Message: ${error}`, "error");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { article } = data;
      setArticle(article);
    }
  }, [data]);

  return (
    <Default>
      <div
        style={{
          width: "100%",
          height: "80vh",
          border: "1px solid black",
          borderRadius: "12px",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ fontSize: "70px", marginLeft: "2%" }}>
            {article.title}
          </div>
          <div
            style={{
              fontSize: "20px",
              marginLeft: "auto",
              marginRight: "2%",
              marginTop: "60px",
            }}
          >
            {new Date(article.createdAt).toDateString()}
          </div>
        </div>
        <div style={{ fontSize: "24px", marginLeft: "2%", marginRight: "2%" }}>
          POST By: {article.author}
        </div>
        <div
          style={{
            display: "inline-bloack",
            fontSize: "24px",
            marginTop: "2%",
            marginLeft: "2%",
            marginRight: "2%",
            height: "50%",
            maxWidth: "100%",
            wordWrap: "break-word",
          }}
        >
          {article.content}
        </div>
      </div>
    </Default>
  );
};

export default Detail;
