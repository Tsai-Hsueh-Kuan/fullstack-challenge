import { v4 } from "uuid";
import dbService from "../utils/orbitDb";

export const Query = {
  articles: async (_: any, { limit, offset }: { limit: number; offset: number }) => {
    try {
      const articles = await dbService.getAllArticles();
      return articles.slice(offset, limit + offset);
    } catch (error) {
      console.log("error in articles", error);
    }
  },
  article: async (_: any, { id }: { id: string }) => {
    try {
      const [article] = await dbService.getArticleById(id);
      return article;
    } catch (error) {
      console.log("error in article", error);
    }
  },
  articlesCount: async () => {
    try {
      const articles = await dbService.getAllArticles();
      const articlesCount = articles.length;
      return { articlesCount };
    } catch (error) {
      console.log("error in articlesCount", error);
    }
  },
};

export const Mutation = {
  addArticle: async (_: any, args: any) => {
    const { title, content, author } = args;
    const article = {
      id: v4(),
      title,
      content,
      author,
      created_at: new Date().getTime(),
    };
    try {
      const newArticle = await dbService.addArticle(article);
      return newArticle;
    } catch (error) {
      console.log("error in addArticle", error);
    }
  },
};
