import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { formattedDate } from "./formatter";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      // Name des Typen: "BlogPost"
      BlogPost: {
        fields: {
          // Name des Feldes, das konfiguriert werden soll: "title"
          title: {
            read(currentTitle) {
              return currentTitle.toUpperCase();
            }
          },
          formattedDate(_, { readField }) {
            const date = readField("date");
            if (typeof date === "string") {
              return formattedDate(date);
            }
          }
        }
      }
    }
  })
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);
