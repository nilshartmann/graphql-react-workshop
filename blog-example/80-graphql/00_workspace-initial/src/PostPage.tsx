import * as React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LikePostDocument, PostPageDocument } from "./__generated__/graphql";

function usePostIdParam() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error("Missing parameter postId in URL path");
  }

  return postId;
}

export default function PostPage() {

  const blogPostId = usePostIdParam();

  // ÜBUNG: useQuery #2
  //  - Wenn du in der PostListPage auf einen BlogPost klickst, sollte dieser hier dargestellt werden
  //  - leider funktionieren hier weder der Query noch die Mutation zum Liken 😰
  //
  //  - Kannst Du Query und Mutation so ergänzen, dass die beiden funktionieren
  //    - dann sollte der BlogPost angezeigt werden
  //    - unter dem BlogPost ist ein "Like"-Button, der dann auch funktionieren sollte

  const { loading, error, data } = useQuery(PostPageDocument);

  const [likePost] = useMutation(LikePostDocument);

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
