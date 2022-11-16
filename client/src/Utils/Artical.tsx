import gql from "graphql-tag";

export const GET_ARTICLES = gql`
  query articles($limit: Int!, $offset: Int!) {
    articles(limit: $limit, offset: $offset) {
      id
      author
      title
      content
      createdAt: created_at
    }
  }
`;

export const GET_ARTICLE = gql`
  query article($id: String!) {
    article(id: $id) {
      id
      author
      title
      content
      createdAt: created_at
    }
  }
`;

export const GET_ARTICLES_COUNT = gql`
  query articlesCount {
    articlesCount {
      articlesCount
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation addArticle($author: String!, $title: String!, $content: String!) {
    addArticle(author: $author, title: $title, content: $content) {
      id
      author
      title
      content
      createdAt: created_at
    }
  }
`;
