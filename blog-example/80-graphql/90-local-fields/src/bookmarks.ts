// Beschreibt ein Bookmark
export type IBookmark = {
  // Titel eines Blogposts
  title: string;

  // Pfad (für React Router) zu dem Blogpost
  // - Kann ausserdem als "id" verwendet werden, um ein
  //   Bookmark eindeutig zu identifizieren
  path: string;
};

// TODO:
//  1. Erzeuge eine reaktive Variable, die eine Liste von Bookmarks enthält
//  2. In der Komponente PostList (bzw. in PostTeaser) soll ein Post als Bookmark hinzugefügt werden
//      Datei: PostList.tsx
//  3. In der Komponente BookmarkSidebar sollen die aktuellen Bookmarks dargestellt werden
//      Datei: BookmarkSidebar.tsx
