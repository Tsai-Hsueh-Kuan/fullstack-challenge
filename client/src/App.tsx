import * as React from "react";
import { Router } from "@reach/router";
import { Home, Edit, Detail, Error } from "./Pages";
import { Mainnet, DAppProvider, Config } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import "antd/dist/antd.css";
import "./index.css";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: { [Mainnet.chainId]: getDefaultProvider("mainnet") },
};

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/",
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <div>
    <ApolloProvider client={apolloClient}>
      <DAppProvider config={config}>
        <Router>
          <Home path="/" />
          <Home path="/home" />
          <Edit path="/edit" />
          <Detail path="/detail/:id" />
          <Error path="*" />
        </Router>
      </DAppProvider>
    </ApolloProvider>
  </div>
);

export default App;
