import React from "react";

import { render } from "@testing-library/react";

import PostList from "../PostList";
import { MemoryRouter } from "react-router-dom";

const mockPosts = [
  {
    id: "1",
    title: "One",
    body: "Lorem ipsum",
    formattedDate: "2019-08-23",
    date: "2019-08-23T18:25:43.511Z"
  },
  {
    id: "2",
    title: "Second Post",
    body: "Some more content",
    formattedDate: "2019-09-22",
    date: "2019-09-22T14:12:21.511Z"
  }
];

it("renders correctly", () => {
  const tree = render(
    <MemoryRouter>
      <PostList posts={mockPosts} />
    </MemoryRouter>
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
