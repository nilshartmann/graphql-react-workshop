/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BlogPost = {
  __typename?: 'BlogPost';
  body: Scalars['String']['output'];
  date: Scalars['String']['output'];
  formattedDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Scalars['Int']['output'];
  teaser?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  user: User;
};


export type BlogPostTeaserArgs = {
  maxLength?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBlogPostResult = {
  __typename?: 'CreateBlogPostResult';
  blogPost?: Maybe<BlogPost>;
  error?: Maybe<Scalars['String']['output']>;
};

export type LikePostResult = {
  __typename?: 'LikePostResult';
  blogPost?: Maybe<BlogPost>;
  error?: Maybe<Scalars['String']['output']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlogPost: CreateBlogPostResult;
  likePost: LikePostResult;
  login: LoginResult;
};


export type MutationCreateBlogPostArgs = {
  postData: NewBlogPost;
};


export type MutationLikePostArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type NewBlogPost = {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String']['output'];
  post?: Maybe<BlogPost>;
  posts: Array<BlogPost>;
  users: Array<User>;
};


export type QueryPingArgs = {
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewLike: BlogPost;
};


export type SubscriptionOnNewLikeArgs = {
  postId?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  login: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type AddBlogPostMutationVariables = Exact<{
  postData: NewBlogPost;
}>;


export type AddBlogPostMutation = { __typename?: 'Mutation', newPost: { __typename?: 'CreateBlogPostResult', error?: string | null, blogPost?: { __typename?: 'BlogPost', id: string, title: string, date: string, body: string, user: { __typename?: 'User', id: string, name: string } } | null } };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'LikePostResult', blogPost?: { __typename?: 'BlogPost', id: string, likes: number } | null } };

export type PostListPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PostListPageQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'BlogPost', date: string, title: string, teaser?: string | null, id: string }> };

export type PostPageQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type PostPageQuery = { __typename?: 'Query', post?: { __typename?: 'BlogPost', id: string, title: string, date: string, body: string, likes: number } | null };


export const AddBlogPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBlogPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewBlogPost"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"newPost"},"name":{"kind":"Name","value":"createBlogPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"blogPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBlogPostMutation, AddBlogPostMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blogPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;
export const PostListPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostListPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"maxLength"},"value":{"kind":"IntValue","value":"20"}}]},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PostListPageQuery, PostListPageQueryVariables>;
export const PostPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]}}]} as unknown as DocumentNode<PostPageQuery, PostPageQueryVariables>;