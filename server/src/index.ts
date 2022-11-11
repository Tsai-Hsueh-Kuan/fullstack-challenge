require("dotenv").config();
import * as fs from "fs";
import * as path from "path";
import { ApolloServer } from "apollo-server";
import { Query, Mutation } from "./resolvers/resolver";
import orbitDb from "./utils/orbitDb";

const server = new ApolloServer({
  cors: { origin: "*" },
  dataSources: () => ({}),
  debug: true,
  resolvers: {
    Query,
    Mutation,
  },
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./schema/artical.graphql"),
    "utf-8"
  ),
});

async function main() {
  await orbitDb.startDb();
  await server
    .listen({ port: process.env.SERVER_PORT || "3000" })
    .then(({ url }) => console.log(`Server is ready at ${url}`));
}

main();
