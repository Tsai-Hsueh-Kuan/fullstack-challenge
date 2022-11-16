import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useQuery } from "@apollo/client";
import { GET_ARTICLES, GET_ARTICLES_COUNT } from "../Utils/Artical";
import Default from "../Layout/Default";
import { Pagination, Table, Typography, Button } from "antd";
const { Paragraph } = Typography;
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { EditOutlined } from "@ant-design/icons";

const QUANTITIES_OF_PAGE = 10;

const Home = (props: RouteComponentProps) => {
  const [articlesCount, setArticlesCount] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [articles, setArticles] = useState([
    {
      id: "",
      author: "",
      title: "",
      content: "",
      publicationDate: "",
    },
  ]);

  const { error: countError, data: countData } = useQuery(GET_ARTICLES_COUNT);

  const { error, data, refetch } = useQuery(GET_ARTICLES, {
    variables: {
      limit: QUANTITIES_OF_PAGE,
      offset: (currentPage - 1) * QUANTITIES_OF_PAGE,
    },
  });

  useEffect(() => {
    if (error) {
      Swal.fire("An error occurred...", `Error Message: ${error}`, "error");
    }
  }, [error, countError]);

  useEffect(() => {
    if (countData) {
      const { articlesCount } = countData;
      setArticlesCount(articlesCount.articlesCount);
    }
  }, [countData]);

  useEffect(() => {
    if (data) {
      const { articles } = data;
      setArticles(
        articles.map((e: any) => {
          return {
            ...e,
            publicationDate: new Date(e.createdAt).toDateString(),
          };
        })
      );
    }
  }, [data]);

  const onChange: PaginationProps["onChange"] = async (pageNumber) => {
    await setPage(pageNumber);
    await refetch();
  };

  interface articleType {
    id: string;
    author: string;
    title: string;
    content: string;
    publicationDate: string;
  }

  const columns: ColumnsType<articleType> = [
    {
      title: "Author",
      width: 4,
      dataIndex: "author",
      key: "author",
      fixed: "left",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{text}</Paragraph>
      ),
    },
    {
      title: "Title",
      width: 4,
      dataIndex: "title",
      key: "title",
      fixed: "left",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{text}</Paragraph>
      ),
    },
    {
      title: "Content",
      width: 10,
      dataIndex: "content",
      key: "content",
      fixed: "left",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{text}</Paragraph>
      ),
    },
    {
      title: "Date of Publication",
      width: 3,
      dataIndex: "publicationDate",
      key: "publicationDate",
      fixed: "left",
    },
    {
      title: "Detail Page",
      width: 2,
      dataIndex: "id",
      key: "URL",
      fixed: "left",
      render: (text) => {
        const link = `/detail/${text}`;
        return <a href={link}>link</a>;
      },
    },
  ];

  return (
    <Default>
      <Button
        type="primary"
        size="large"
        shape="round"
        style={{
          position: "fixed",
          bottom: "5%",
          right: "2%",
          zIndex: 999,
          border: "5px solid	#0080FF",
        }}
        href="/edit"
      >
        <EditOutlined />
        Post a new article !
      </Button>
      <Table
        columns={columns}
        dataSource={articles}
        pagination={false}
      />
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Pagination
          showQuickJumper
          showSizeChanger={false}
          current={currentPage}
          total={articlesCount}
          onChange={onChange}
        />
      </div>
    </Default>
  );
};

export default Home;
