import React from "react";
import { Link } from "react-router-dom";

type IPostTeaser = {
  id: string;
  formattedDate: string;
  title: string;
  teaser?: string | null;
};
type PostListProps = {
  posts: IPostTeaser[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      <Link className="Button" to="/add">
        Add Post
      </Link>
      {posts.map(p => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </>
  );
}

type PostTeaserProps = {
  post: IPostTeaser;
};
function PostTeaser({ post }: PostTeaserProps) {
  const path = `/post/${post.id}`;
  const title = post.title;

  // todo:
  //  - jedes dargestellte Post soll einen Button bekommen,
  //    mit dem er als Bookmark hinzugefügt werden kann
  //    - die nötigen Informationen (path, title) sind oben
  //      schon als Variable vorhanden

  return (
    <article key={post.id} className="Container">
      <Link to={path}>
        <h2>{title}</h2>
      </Link>
      <p className="Date">{post.formattedDate}</p>

      <p>{post.teaser}</p>
    </article>
  );
}
