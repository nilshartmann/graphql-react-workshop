import { MockedResponse, MockedProvider } from "@apollo/client/testing";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { GraphQLError } from "graphql";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PostPage from "../PostPage";
import { PostPageDocument, PostPageQuery } from "../__generated__/graphql";

test("PostPage", async () => {
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

  render(
    <MemoryRouter initialEntries={["/post/P1"]}>
      <MockedProvider mocks={[postPageMock]}>
        <Routes>
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByRole("heading", { name: /loading/i }));
  expect(await screen.findByRole("heading", { name: /hello world/i })).toBeInTheDocument();
  expect(await screen.findByText("Lorem ipsum dolor sit")).toBeInTheDocument();
});

test("error works", async () => {
  const postPageMockErr: MockedResponse<PostPageQuery> = {
    request: {
      query: PostPageDocument,
      variables: {
        postId: "P2"
      }
    },
    result: {
      errors: [new GraphQLError("au weia!")]
    }
  };

  render(
    <MemoryRouter initialEntries={["/post/P2"]}>
      <MockedProvider mocks={[postPageMockErr]}>
        <Routes>
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByRole("heading", { name: /loading/i }));
  expect(await screen.findByText(/au weia/i)).toBeInTheDocument();
});
