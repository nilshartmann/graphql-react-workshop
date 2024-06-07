import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider, makeVar } from "@apollo/client";
import { formattedDate } from "./formatter";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      BlogPost: {
        fields: {
          // locale() {
          //   return window.document.title;
          // },
          formattedDate(_, { readField }) {
            const likes = readField("likes");
            return "!!! FORMATIERTE LIKES: " + likes;
            // const date = readField("date");
            // if (typeof date === "string") {
            //   // Datum formatieren
            //   return formattedDate(date);
            // }
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
