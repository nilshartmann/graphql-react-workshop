import React from "react";
import { Link } from "react-router-dom";
import { removeBookmark, useBookmarks } from "./bookmarks";
export default function Bookmarks() {
  const bookmarks = useBookmarks();

  return (
    <div>
      <h2>Bookmarks</h2>

      {bookmarks.map(b => {
        return (
          <p key={b.path}>
            <Link to={b.path}>{b.title}</Link> (
            <button className="small" onClick={() => removeBookmark(b.path)}>
              Remove
            </button>
            )
          </p>
        );
      })}
    </div>
  );
}
