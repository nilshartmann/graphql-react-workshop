import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { addBookmark, useBookmarks } from "./bookmarks";

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
  const bookmarks = useBookmarks();

  const handleAddToBookmark = useCallback((post: IPostTeaser) => {
    addBookmark(post.title, `/post/${post.id}`);
  }, []);

  const isBookmarked = (p: IPostTeaser) => {
    return !!bookmarks.find(b => b.path === `/post/${p.id}`);
  };

  return (
    <>
      <Link className="Button" to="/add">
        Add Post
      </Link>
      {posts.map(p => (
        <PostTeaser
          key={p.id}
          post={p}
          handleAddToBookmark={isBookmarked(p) ? null : handleAddToBookmark}
        />
      ))}
    </>
  );
}

type PostTeaserProps = {
  handleAddToBookmark?: ((post: IPostTeaser) => void) | null;
  post: IPostTeaser;
};
const PostTeaser = React.memo(function PostTeaser({ post, handleAddToBookmark }: PostTeaserProps) {
  const handleBookmarkClick = handleAddToBookmark ? () => handleAddToBookmark(post) : undefined;
  return (
    <article key={post.id} className="Container">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p className="Date">{post.formattedDate}</p>

      <p>{post.teaser}</p>
      {handleBookmarkClick ? (
        <button className="small" onClick={handleBookmarkClick}>
          Add to bookmark
        </button>
      ) : (
        <span>Already bookmarked</span>
      )}
    </article>
  );
});
