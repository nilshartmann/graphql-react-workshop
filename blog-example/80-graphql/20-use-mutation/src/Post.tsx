import React from "react";
import { BlogPost } from "./types";

type PostProps = {
  post: BlogPost;
};

export default function Post({ post }: PostProps) {
  return (
    <article className="Container">
      <p className="Date">{post.date}</p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
