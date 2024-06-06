import { makeVar, useReactiveVar } from "@apollo/client";

type IBookmark = {
  title: string;
  path: string;
};

export const bookmarksVar = makeVar<IBookmark[]>([]);

export function useBookmarks() {
  return useReactiveVar(bookmarksVar);
}

export function addBookmark(title: string, path: string) {
  const bookmarks = bookmarksVar();
  if (!bookmarks.find(b => b.path === path)) {
    bookmarksVar([
      ...bookmarks,
      {
        title,
        path
      }
    ]);
  }
}

export function removeBookmark(path: string) {
  const bookmarks = bookmarksVar();
  bookmarksVar(bookmarks.filter(b => b.path !== path));
}
