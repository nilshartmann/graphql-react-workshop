import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import { useMutation } from "@apollo/client";
import { AddBlogPostDocument, PostListPageDocument } from "./__generated__/graphql";

// ÜBUNG: useMutation
//
// -- Diese Seite soll einen neuen BlogPost speichern und ggf. eine Fehlermeldung darstellen
//   - Die Mutation ist bereits fertig (AddBlogPost.mutation.graphql)
//   - Das Document-Objekt etc. ist auch schon generiert
// - Verwende useMutation, um die Mutation auszuführen
// - Nachdem die Mutation erfolgreich (!) ausgeführt wurde, verwende "navigate"
//    um einen Redirect auf die Homepage ("/") zu machen
// - Wenn es einen Fehler gibt, gib die Fehlermeldung an den PostEditor weiter
//    Du kannst einen Fehler provozieren, wenn Du einen Titel speicherst, der kürzer
//    als vier Zeichen lang ist

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
      // Alternativen:
      //   - fetchPolicy in PostListPage ändern
      //   - pollingInterval in PostListPage
      //   - refetch-Button in PostListPage
      //   - Cache direkt ändern (kommt noch)
      refetchQueries: [
        {
          query: PostListPageDocument
        }
      ]
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
