/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation AddBlogPost($postData: NewBlogPost!) {\n  newPost: createBlogPost(postData: $postData) {\n    error\n    blogPost {\n      id\n      title\n      date\n      body\n      user {\n        id\n        name\n      }\n    }\n  }\n}": types.AddBlogPostDocument,
    "mutation LikePost($postId: ID!) {\n  likePost(postId: $postId) {\n    blogPost {\n      id\n      likes\n    }\n  }\n}": types.LikePostDocument,
    "query PostComments($postId: ID!) {\n  comments(postId: $postId) {\n    id\n    comment\n    username\n  }\n}": types.PostCommentsDocument,
    "\n  query BlogPostIds {\n    posts {\n      id\n    }\n  }\n": types.BlogPostIdsDocument,
    "fragment UserMitIdUndName on User {\n  id\n  name\n}\n\nquery PostListPage {\n  posts {\n    teaser(maxLength: 20)\n    id\n    date\n    title\n    user {\n      ...UserMitIdUndName\n    }\n  }\n}": types.UserMitIdUndNameFragmentDoc,
    "query PostPage($postId: ID!) {\n  post(postId: $postId) {\n    id\n    title\n    date\n    body\n    likes\n    formattedDate @client\n  }\n}": types.PostPageDocument,
    "\n  query SimpleBlog {\n    post(postId: \"P7\") {\n      id\n      formattedDate @client\n    }\n  }\n": types.SimpleBlogDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddBlogPost($postData: NewBlogPost!) {\n  newPost: createBlogPost(postData: $postData) {\n    error\n    blogPost {\n      id\n      title\n      date\n      body\n      user {\n        id\n        name\n      }\n    }\n  }\n}"): (typeof documents)["mutation AddBlogPost($postData: NewBlogPost!) {\n  newPost: createBlogPost(postData: $postData) {\n    error\n    blogPost {\n      id\n      title\n      date\n      body\n      user {\n        id\n        name\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LikePost($postId: ID!) {\n  likePost(postId: $postId) {\n    blogPost {\n      id\n      likes\n    }\n  }\n}"): (typeof documents)["mutation LikePost($postId: ID!) {\n  likePost(postId: $postId) {\n    blogPost {\n      id\n      likes\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PostComments($postId: ID!) {\n  comments(postId: $postId) {\n    id\n    comment\n    username\n  }\n}"): (typeof documents)["query PostComments($postId: ID!) {\n  comments(postId: $postId) {\n    id\n    comment\n    username\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BlogPostIds {\n    posts {\n      id\n    }\n  }\n"): (typeof documents)["\n  query BlogPostIds {\n    posts {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UserMitIdUndName on User {\n  id\n  name\n}\n\nquery PostListPage {\n  posts {\n    teaser(maxLength: 20)\n    id\n    date\n    title\n    user {\n      ...UserMitIdUndName\n    }\n  }\n}"): (typeof documents)["fragment UserMitIdUndName on User {\n  id\n  name\n}\n\nquery PostListPage {\n  posts {\n    teaser(maxLength: 20)\n    id\n    date\n    title\n    user {\n      ...UserMitIdUndName\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PostPage($postId: ID!) {\n  post(postId: $postId) {\n    id\n    title\n    date\n    body\n    likes\n    formattedDate @client\n  }\n}"): (typeof documents)["query PostPage($postId: ID!) {\n  post(postId: $postId) {\n    id\n    title\n    date\n    body\n    likes\n    formattedDate @client\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SimpleBlog {\n    post(postId: \"P7\") {\n      id\n      formattedDate @client\n    }\n  }\n"): (typeof documents)["\n  query SimpleBlog {\n    post(postId: \"P7\") {\n      id\n      formattedDate @client\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;