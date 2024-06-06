import React from "react";
import { Link } from "react-router-dom";
import { IBookmark } from "./bookmarks";
export default function Bookmarks() {
  // todo:
  //   - Implementiere die Funktion, so dass sie
  //     die aktuellen Bookmarks darstellt
  //   - Implementiere das Verhalten des 'remove'-Buttons,
  //     so dass der gewählte Bookmark gelöscht wird

  const bookmarks: IBookmark[] = [];

  return (
    <div>
      <h2>Bookmarks</h2>

      {bookmarks.map(b => {
        return (
          <p key={b.path}>
            <Link to={b.path}>{b.title}</Link> (<button className="small">Remove</button>)
          </p>
        );
      })}
    </div>
  );
}
