import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddBlogPostDocument, PostListPageDocument } from "./__generated__/graphql";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import { gql, useMutation } from "@apollo/client";

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

type BlogPostIds = { posts: Array<{ id: string }> };

export default function PostEditorPage() {
  const [mutate, { error, data, called, loading }] = useMutation(AddBlogPostDocument);
  const navigate = useNavigate();
  async function savePost(post: NewBlogPost) {
    const { data } = await mutate({
      variables: {
        postData: post
      },
      // todo: entferne refetchQueries und füge die update-Funktion hinzu
      //
      //  - Wenn die update-Funktion NICHT mit data bzw. KEINEM neuen BlogPost
      //     aufgerufen wurde, kannst Du die Funktion einfach mit "return" verlassen
      //
      //  - Sonst musst Du mit `readQuery` die Liste aller
      //    BlogPosts aus dem Cache lesen
      //    - Definiere dafür mit 'gql' einen GraphQL Query, der die 'id's aller
      //      Posts ausliest
      //      - TypeScript-Typ für das Ergebnis von `readQuery` ist BlogPostIds (s.o.)
      //  - Wenn es noch keine Einträge im Cache gibt, erzeuge eine neue Liste,
      //    die nur aus dem neuen BlogPost besteht
      //  - Wenn es bereits Einträge im Cache gibt, füge den BlogPost in die
      //    Liste ein.
      //    - Der neue Post soll am Anfang der Liste stehen
      //    - Achtung: Bestehende Liste nicht verändern, sondern Kopie erzeugen!
      //  - Schreibe die neue Liste mit 'writeQuery' zurück
      //    - Als 'query' kannst Du dafür denselben Query wie bei 'readQuery'
      //      verwenden
      // update(cache, result) {
      // },
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
