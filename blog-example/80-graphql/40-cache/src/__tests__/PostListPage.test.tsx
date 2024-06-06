import { render, screen } from "@testing-library/react";
import PostListPage from "../PostListPage";
import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { PostListPageDocument, PostListPageQuery } from "../__generated__/graphql";
test("PostListPage", async () => {
  const mock: MockedResponse<PostListPageQuery> = {
    request: {
      query: PostListPageDocument,
      operationName: "PostListPage"
    },
    result: {
      data: {
        posts: [
          {
            date: "2022-02-23",
            formattedDate: "2023-02-23",
            title: "Hello World",
            teaser: "Lorem ipsum",
            id: "P1"
          }
        ]
      }
    }
  };

  const mocks: MockedResponse[] = [mock];

  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <PostListPage />
      </MockedProvider>
    </MemoryRouter>
  );

  // Loading kommt sofort, kein await hier notwendig
  expect(screen.getByRole("heading", { name: /Loading, please wait/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Hello World" })).not.toBeInTheDocument();

  // Warten, bis das gemockte Ergebnis angezeigt wird
  const articleOne = await screen.findByRole("heading", { name: "Hello World" });
  expect(articleOne).toBeInTheDocument();
});
