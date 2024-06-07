import { gql, useMutation, useQuery } from "@apollo/client";
import { LikePostDocument, PostPageDocument, SimpleBlogDocument } from "./__generated__/graphql";
import { Link } from "react-router-dom";
import Post from "./Post";
import * as React from "react";

type PostViewProps = {
  blogPostId: string;
};

const SimpleBlogQuery = gql`
  query SimpleBlog {
    post(postId: "P7") {
      id
      formattedDate @client
    }
  }
`;

export default function PostView({ blogPostId }: PostViewProps) {
  const { loading, error, data } = useQuery(SimpleBlogDocument);

  if (loading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (error) {
    return <h1>GraphQL Failed: {error.toString()}</h1>;
  }
  if (data && data.post) {
    return (
      <>
        <div>
          <p>{data.post.formattedDate} </p>
        </div>
      </>
    );
  }

  return <h1>Please wait, Post is loading</h1>;
}
