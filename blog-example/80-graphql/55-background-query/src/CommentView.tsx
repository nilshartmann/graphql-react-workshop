import { QueryReference, useReadQuery } from "@apollo/client";
import React from "react";
import { PostCommentsQuery } from "./__generated__/graphql";

// TODO:
//  - Implementiere die CommentView-Komponente
//  - Das Property 'commentQueryRef' muss eine QueryReference sein
//    - mit welchem Query als Typ-Argument?
//  - Verwende 'useReadQuery' um die Daten zu lesen
//  - Die gelesenen Daten kannst Du mit der 'CommentList'-Komponente rendern
//

type CommentViewProps = {
  commentQueryRef: QueryReference<PostCommentsQuery>;
};
export default function CommentView({ commentQueryRef }: CommentViewProps) {
  const result = useReadQuery(commentQueryRef);

  return <CommentList comments={result.data.comments} />;
}

type CommentListProps = {
  comments: PostCommentsQuery["comments"];
};
function CommentList({ comments }: CommentListProps) {
  return (
    <section className={"Container"}>
      <h2>Comments</h2>
      <ul>
        {comments.map(c => (
          <li key={c.id}>{c.comment}</li>
        ))}
      </ul>
    </section>
  );
}
