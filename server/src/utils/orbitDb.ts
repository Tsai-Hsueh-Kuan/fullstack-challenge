const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");
const KeyValueStore = require("orbit-db-kvstore");

type Article = {
  id: String;
  author: String;
  title: String;
  content: String;
  created_at: Number;
};

class orbitDatabase {
  private db: typeof OrbitDB;
  private articleStore: typeof KeyValueStore;

  startDb = async (dbName: string = "Articles") => {
    const ipfs = await IPFS.create();
    this.db = await OrbitDB.createInstance(ipfs);
    this.articleStore = await this.db.docs(dbName, { indexBy: "id" });
    await this.articleStore.load();
    console.log(`${dbName} database is ready`);
  };

  addArticle = async (article: Article) => {
    await this.articleStore.put(article);
    return this.articleStore.get(article.id);
  };

  getArticleById = async (articleId: string) => {
    return this.articleStore.get(articleId);
  };

  getAllArticles = async () => {
    return this.articleStore.all.map(
      (article: any) => article.payload.value
    );
  };
}

export default new orbitDatabase();
