import * as React from "react";
import { useNavigate } from "react-router-dom";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";

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

export default function PostEditorPage() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  async function savePost(post: NewBlogPost) {
    // TODO:
    //  - Mutation ausführen
    //  - Bei Erfolg Redirect machen
    //  - was musst Du tun, damit der neue Post auch auf der "/"-Seite angezeigt wird?
  }

  const errorMessage = null; // TODO: ggf. Error aus Antwort lesen

  return <PostEditor onSavePost={savePost} error={errorMessage} />;
}
