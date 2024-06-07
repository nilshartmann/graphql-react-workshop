import * as React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import {
  QueryReference,
  useBackgroundQuery,
  useMutation,
  useQuery,
  useReadQuery,
  useSuspenseQuery
} from "@apollo/client";
import {
  LikePostDocument,
  PostCommentsDocument,
  PostCommentsQuery,
  PostPageDocument
} from "./__generated__/graphql";
import { ErrorBoundary } from "react-error-boundary";
import { countVar, useCounter } from "./use-counter";

function usePostIdParam() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error("Missing parameter postId in URL path");
  }

  return postId;
}

type BlogErrorBoundaryProps = {
  error: Error;
  resetErrorBoundary(): void;
};
function BlogErrorHandler({ error, resetErrorBoundary }: BlogErrorBoundaryProps) {
  return <h1>Fehler aufgetreten: {error.toString()}</h1>;
}

export default function PostPage() {
  // Error Boundary Komponente
  return (
    <ErrorBoundary fallbackRender={BlogErrorHandler}>
      <React.Suspense fallback={<h1>Loading Blog Post...</h1>}>
        <PostPageInternal />
      </React.Suspense>
    </ErrorBoundary>
  );
}

function PostPageInternal() {
  const blogPostId = usePostIdParam();

  // const { loading, error, data } = useQuery(PostPageDocument, {
  //   variables: {
  //     postId: blogPostId
  //   }
  // });

  const [commentQueryRef] = useBackgroundQuery(PostCommentsDocument, {
    variables: {
      postId: blogPostId
    }
  });

  const { data } = useSuspenseQuery(PostPageDocument, {
    variables: {
      postId: blogPostId
    }
  });

  // console.log("Hallo")

  const [likePost] = useMutation(LikePostDocument, {
    variables: {
      postId: blogPostId
    }
  });

  const counterVar = useCounter();

  // if (loading) {
  //   return <h1>Loading, please wait...</h1>;
  // }
  //
  // if (error) {
  //   return <h1>GraphQL Failed: {error.toString()}</h1>;
  // }
  if (data.post) {
    console.log("data.post", data.post.formattedDate);
    return (
      <>
        <Link className="Button" to="/">
          Home
        </Link>
        <Post post={data.post} />

        <div>
          <button onClick={() => countVar(counterVar + 1)}>Count!</button>
          <p>{data.post.likes} likes</p>
          <p>Formattierten Likes: {data.post.formattedDate}</p>

          <button onClick={() => likePost()}>Like!</button>
        </div>
        <React.Suspense fallback={<h1>Loading Comments...</h1>}>
          <CommentList commentQueryRef={commentQueryRef} />
        </React.Suspense>
      </>
    );
  }

  return <h1>Post not found.</h1>;
}

type CommentListProps = { commentQueryRef: QueryReference<PostCommentsQuery> };
function CommentList({ commentQueryRef }: CommentListProps) {
  const { data } = useReadQuery(commentQueryRef);

  return (
    <section className={"Container"}>
      <h2>Comments</h2>
      <ul>
        {data.comments.map(c => (
          <li key={c.id}>{c.comment}</li>
        ))}
      </ul>
    </section>
  );
}
