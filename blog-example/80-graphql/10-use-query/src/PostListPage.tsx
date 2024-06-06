import React from "react";
import PostList from "./PostList";
import { gql, useQuery } from "@apollo/client";
import { PostListPageDocument } from "./__generated__/graphql";

export default function PostListPage() {
  // ÜBUNG: useQuery
  //
  // -- Diese Seite soll die "Teaser" aller Blog Posts anzeigen

  //   1. Der Query ist in PostListPage.query.graphql definiert und die entsprechenden
  //      PostListPageDocument- und Query-Objekte bzw. Typen sind dafür bereits generiert

  //   2. Verwende 'useQuery' um den Query auszuführen
  //     - Während die Daten geladen werden, zeige eine Meldung an ("Bitte warten Sie")
  //     - Wenn es einen Fehler gibt, zeige eine Fehlermeldung an
  //     - Wenn die Daten geladen worden sind, übergib diese an die PostList-Komponente
  //       - dank außerdem dran, dass 'data' auch undefined sein kann
  //         (in dem Fall einfach einen Fehler ausgeben)

  const { data, loading, error } = useQuery(PostListPageDocument);

  if (loading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error! Loading failed!</h1>;
  }

  if (!data) {
    return <h1>No data found ???</h1>;
  }

  return <PostList posts={data.posts} />;
}
