import * as React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { LikePostDocument, PostPageDocument } from "./__generated__/graphql";
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function usePostIdParam() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error("Missing parameter postId in URL path");
  }

  return postId;
}

function ErrorHandler({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section>
      <h1>Error! {error.toString()}</h1>
      <button onClick={() => resetErrorBoundary()}>Try again!</button>
    </section>
  );
}

export default function PostPage() {
  const blogPostId = usePostIdParam();

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Suspense fallback={<h1>Loading Blog Post!</h1>}>
        <PostPageInternal blogPostId={blogPostId} />
      </Suspense>
    </ErrorBoundary>
  );
}

type PostPageInternalProps = {
  blogPostId: string;
};

function PostPageInternal({ blogPostId }: PostPageInternalProps) {
  // ÜBUNG: useQuery #2
  //  - Wenn du in der PostListPage auf einen BlogPost klickst, sollte dieser hier dargestellt werden
  //  - leider funktionieren hier weder der Query noch die Mutation zum Liken 😰
  //
  //  - Kannst Du Query und Mutation so ergänzen, dass die beiden funktionieren
  //    - dann sollte der BlogPost angezeigt werden
  //    - unter dem BlogPost ist ein "Like"-Button, der dann auch funktionieren sollte

  const { data } = useSuspenseQuery(PostPageDocument, {
    variables: {
      postId: blogPostId
    }
  });

  const [likePost] = useMutation(LikePostDocument, {
    variables: {
      postId: blogPostId
    }
  });

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
