import { MockedResponse, MockedProvider } from "@apollo/client/testing";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import {
  PostListPageDocument,
  PostListPageQuery,
  PostPageDocument,
  PostPageQuery
} from "../__generated__/graphql";

test("App Navigation works", async () => {
  const postListMock: MockedResponse<PostListPageQuery> = {
    request: {
      query: PostListPageDocument
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

  const postPageMock: MockedResponse<PostPageQuery> = {
    request: {
      query: PostPageDocument,
      variables: {
        postId: "P1"
      }
    },
    result: {
      data: {
        post: {
          date: "2023-02-23",
          formattedDate: "2023-02-23",
          title: "Hello World",
          id: "P1",
          body: "Lorem ipsum dolor sit",
          likes: 1
        }
      }
    }
  };

  const mocks: MockedResponse[] = [postListMock, postPageMock];

  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByRole("heading", { name: /loading/i }));

  expect(await screen.findByRole("heading", { name: /hello world/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole("link", { name: /hello world/i }));

  expect(await screen.findByText("Lorem ipsum dolor sit")).toBeInTheDocument();
});
