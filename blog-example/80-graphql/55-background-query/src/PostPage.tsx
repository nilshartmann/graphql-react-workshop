import * as React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { QueryReference, useBackgroundQuery, useMutation, useSuspenseQuery } from "@apollo/client";
import {
  LikePostDocument,
  PostCommentsDocument,
  PostCommentsQuery,
  PostPageDocument
} from "./__generated__/graphql";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import CommentView from "./CommentView";

function usePostIdParam() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error("Missing parameter postId in URL path");
  }

  return postId;
}

function AppErrorMessage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section>
      <h1>Error! {error.toString()}</h1>
      <button onClick={() => resetErrorBoundary()}>Try again!</button>
    </section>
  );
}

export default function PostPage() {
  const blogPostId = usePostIdParam();
  const [ref] = useBackgroundQuery(PostCommentsDocument, {
    variables: {
      postId: blogPostId
    }
  });

  return (
    <ErrorBoundary FallbackComponent={AppErrorMessage}>
      <Suspense fallback={<h1>Loading Blog Post!</h1>}>
        <PostPageInternal blogPostId={blogPostId} commentsQueryRef={ref} />
      </Suspense>
    </ErrorBoundary>
  );
}

type PostPageInternalProps = {
  blogPostId: string;
  commentsQueryRef: QueryReference<PostCommentsQuery>;
};

function PostPageInternal({ blogPostId, commentsQueryRef }: PostPageInternalProps) {
  // ÜBUNG: useQuery #2
  //  - Wenn du in der PostListPage auf einen BlogPost klickst, sollte dieser hier dargestellt werden
  //  - leider funktionieren hier weder der Query noch die Mutation zum Liken 😰
  //
  //  - Kannst Du Query und Mutation so ergänzen, dass die beiden funktionieren
  //    - dann sollte der BlogPost angezeigt werden
  //    - unter dem BlogPost ist ein "Like"-Button, der dann auch funktionieren sollte

  const { error, data } = useSuspenseQuery(PostPageDocument, {
    variables: {
      postId: blogPostId
    }
  });

  const [likePost] = useMutation(LikePostDocument, {
    variables: {
      postId: blogPostId
    }
  });

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
        <Suspense fallback={<div>Loading Comments...</div>}>
          <CommentView commentQueryRef={commentsQueryRef} />
        </Suspense>
      </>
    );
  }

  return <h1>Please wait, Post is loading</h1>;
}
