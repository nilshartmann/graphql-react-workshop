import * as React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LikePostDocument, PostPageDocument } from "./__generated__/graphql";

export default function PostPage() {
  const { postId } = useParams<{ postId: string }>();

  const { loading, error, data } = useQuery(PostPageDocument, {
    variables: {
      postId: postId!
    }
  });

  const [likePost] = useMutation(LikePostDocument, {
    variables: { postId: postId! }
  });

  if (loading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (error) {
    return <h1>GraphQL Failed: {error.toString()}</h1>;
  }
  if (data && data.post) {
    return (
      <>
        <Link className="Button" to="/">
          Home
        </Link>
        <Post post={data.post} />

        <div>
          <p>{data.post.likes} likes</p>

          <button onClick={() => likePost()}>Like!</button>
        </div>
      </>
    );
  }

  return <h1>Please wait, Post is loading</h1>;
}
