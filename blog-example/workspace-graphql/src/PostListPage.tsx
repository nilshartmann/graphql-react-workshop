import React from "react";
import PostList from "./PostList";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import {
  PostListPageDocument,
  PostListPageQuery,
  UserMitIdUndNameFragment
} from "./__generated__/graphql";

// const postListPageQuery = gql`
//   query PostList {
//     posts {
//       title
//       teaser
//       date
//     }
//   }
// `;

// type PostListPageQueryResult = {
//   posts: Array<{
//     id: string;
//     title: string;
//     teaser: string;
//     date: string;
//   }>;
// };

export default function PostListPage() {
  //const result = useQuery<PostListPageQueryResult>(postListPageQuery);
  const result = useQuery(PostListPageDocument, {
    // fetchPolicy: "cache-and-network"
    // pollInterval: 1000
  });

  // const [runQuery, result2] = useLazyQuery(PostListPageDocument, {
  // });
  //
  // runQuery();

  // const result = usePostListQuery();

  if (result.loading) {
    return <h1>Blog Posts loading...</h1>;
  }

  if (result.error) {
    return <h1>Es ist ein Fehler aufgetreten</h1>;
  }

  if (!result.data) {
    return <h1>...</h1>;
  }

  // ????
  // console.log("result", result.data.posts[0].user.name);
  // showUser(result.data.posts[0].user);

  return (
    <div>
      <button onClick={() => result.refetch()}>Reload!</button>
      <PostList posts={result.data.posts} />
    </div>
  );
}

// function showUser(user: UserMitIdUndNameFragment) {}
