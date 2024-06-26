module.exports = `

type Comment {
  id: ID!
  comment: String!
  username: String!
}

type BlogPost {
  id: ID!
  title: String!
  # Returns the first n-th chars of the body
  teaser(maxLength: Int): String
  date: String!

  body: String!
  likes: Int!

  user: User!
}

type User {
  id: ID!
  login: String!
  name: String!
}

type Query {
  ping(msg: String): String!
  posts(page: Int, pageSize: Int): [BlogPost!]!
  users: [User!]!
  post(postId: ID!): BlogPost
  """
  In einer 'echten' GraphQL API, waeren die Comments wahrscheinlich direkt am Post Objekt
  """
  comments(postId: ID!): [Comment!]!
}

type LoginResult {
  error: String
  token: String
  user: User
}

input NewBlogPost {
  title: String!,
  body: String!
}

type CreateBlogPostResult {
  error: String
  blogPost: BlogPost
}

type LikePostResult {
  error: String
  blogPost: BlogPost
}

type Mutation {
  login(login: String!, password: String!): LoginResult!
  createBlogPost(postData: NewBlogPost!): CreateBlogPostResult!
  likePost(postId: ID!): LikePostResult!
}

type Subscription {
  onNewLike(postId: ID): BlogPost!
}
`;
