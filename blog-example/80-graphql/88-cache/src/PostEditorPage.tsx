import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import { AddBlogPostDocument } from "./__generated__/graphql";

function SuccessConfirmation() {
  return (
    <div className="Container">
      <h1>Your new post have been saved.</h1>
      <Link className="Button" to="/">
        Home
      </Link>
    </div>
  );
}

export default function PostEditorPage() {
  const [mutate, { error, data, called, loading }] = useMutation(AddBlogPostDocument);
  const navigate = useNavigate();
  async function savePost(post: NewBlogPost) {
    const { data } = await mutate({
      variables: {
        postData: post
      },
      update(cache, { data }) {
        const newBlogPost = data?.newPost.blogPost;
        if (!newBlogPost) {
          return;
        }
        const query = gql`
          {
            posts {
              id
            }
          }
        `;

        const existingPosts = cache.readQuery<{ posts: Array<{ id: string }> }>({
          query
        });

        const newPosts = existingPosts ? [newBlogPost, ...existingPosts.posts] : [newBlogPost];

        cache.writeQuery({
          query,
          data: { posts: newPosts }
        });
      }
    });

    if (data?.newPost.blogPost) {
      navigate("/");
    }
  }

  const errorMessage = error ? error.toString() : data?.newPost.error;

  if (called && !errorMessage && !loading) {
    return <SuccessConfirmation />;
  }

  return <PostEditor onSavePost={savePost} error={errorMessage} />;
}
