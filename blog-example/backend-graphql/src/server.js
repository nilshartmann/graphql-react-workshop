const jwt = require("jsonwebtoken");
const { ApolloServer, AuthenticationError, PubSub, withFilter } = require("apollo-server");
const typeDefs = require("./schema");
const datastore = require("./datastore");
const commentsData = require("./comments-data");

const pubsub = new PubSub();

const checkAuth = false;

/** IN REAL LIVE YOU WILL NEVER STORE JWT_SECRET IN YOUR CODE! */
const JWT_SECRET = "hurzelpurzel";

function tokenFor(userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "10 years"
  });

  return token;
}
const slowDownStr = process.argv[2];

const slowDownPost = slowDownStr !== undefined && !isNaN(slowDownStr) ? parseInt(slowDownStr) : 0;

if (slowDownPost > 0) {
  console.log(`Slow down Query.post for ${slowDownPost}ms`);
}

function buildTeaser({ body }, maxLength) {
  if (body.length <= maxLength) {
    return body;
  }

  return body.substring(0, maxLength) + "...";
}

const resolvers = {
  Query: {
    ping: (_, { msg }) => `Hello, ${msg || "World"}`,
    posts: (_, { page, pageSize }) => {
      console.log("page", page, "pagesize", pageSize);
      const allPosts = datastore.getAllPosts();
      if (page === undefined) {
        page = 0;
      }

      if (pageSize === undefined) {
        pageSize = allPosts.length;
      }

      return allPosts.slice(page * pageSize, page * pageSize + pageSize);
    },
    post: (_, { postId }) => {
      if (slowDownPost > 0) {
        return new Promise(res => {
          setTimeout(() => res(datastore.getPost(postId)), slowDownPost);
        });
      }
      return datastore.getPost(postId);
    },
    users: () => datastore.getAllUsers(),
    comments(_, {postId}) {
      const commentsForPost = commentsData.filter(c => c.postId === postId);
      if (slowDownPost > 0) {
        return new Promise(res => {
          setTimeout(() => res(commentsForPost), slowDownPost * 3);
        });
      }

      return commentsForPost;

    }
  },
  BlogPost: {
    user: blogPost => datastore.getUser(blogPost.userId),
    teaser: (blogPost, { maxLength = 30 }) => buildTeaser(blogPost, maxLength)
  },
  Mutation: {
    login: (_, { login, password }) => {
      if (!password) {
        return {
          error: "Invalid password!"
        };
      }

      const user = datastore.getUserByLogin(login);
      if (!user) {
        return {
          error: "Invalid user!"
        };
      }

      return {
        token: tokenFor(user.id),
        user
      };
    },

    createBlogPost(_, { postData }, { user }) {
      if (checkAuth && !user) {
        return { error: "You must be logged in to save new blog post!" };
      }

      const userId = user ? user.id : "U1";

      if (postData.title.length < 3) {
        return { error: "Title of Blog Post must have at least 3 chars" };
      }

      const savedPost = datastore.insertPost(userId, postData);

      return { blogPost: savedPost };
    },

    likePost(_, { postId }) {
      let likedPost;
      try {
        likedPost = datastore.likePost(postId);
      } catch (e) {
        return {
          error: e.toString()
        };
      }
      pubsub.publish("LikePostEvent", { blogPost: likedPost });
      return {
        blogPost: likedPost
      };
    }
  },
  Subscription: {
    onNewLike: {
      resolve: payload => payload.blogPost,
      subscribe: withFilter(
        (_s, _a, { pubsub }) => pubsub.asyncIterator("LikePostEvent"),
        (payload, variables) => {
          return variables.postId ? variables.postId === payload.blogPost.id : true;
        }
      )
    }
  }
  // Mutation: {
  //   registerChoice: (_, { choiceId }, { pubsub }) => {
  //     const vote = datastore.getVoteForChoice(choiceId);
  //     if (!vote) {
  //       throw new ApolloError(`No choice found with id '${choiceId}'`);
  //     }

  //     const choice = vote.choices.find(c => c.id === choiceId);
  //     choice.count = choice.count + 1;

  //     const storedVote = datastore.store(vote);
  //     pubsub.publish("RegisterChoiceEvent", { vote: storedVote });
  //     return storedVote;
  //   },

  //   addVote: (_, { newVote }) => {
  //     return datastore.addVote(newVote);
  //   }
  // },

  // Subscription: {
  //   onNewChoice: {
  //     resolve: payload => payload.vote,
  //     subscribe: withFilter(
  //       (_s, _a, { pubsub }) => pubsub.asyncIterator("RegisterChoiceEvent"),
  //       (payload, variables) => {
  //         return variables.voteId ? variables.voteId === payload.vote.id : true;
  //       }
  //     )
  //   }
  // }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ req }) => {
    const result = { pubsub };

    if (req) {
      const token = req.headers.authorization;
      if (token) {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = datastore.getUser(payload.userId);
        if (!user) {
          throw new AuthenticationError(`User with id '${payload.userId}' not found`);
        }
        result.user = user;
      }
    }
    return result;
  },

  formatError: err => {
    console.error(err.originalError || err);
    return err;
  },

  playground: {
    // Playground runs at http://localhost:4000
    settings: {
      "editor.theme": "light",
      "schema.polling.enable": false
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`  

Server ready at ${url}
  
Authorization Header For Playground:

{
  "Authorization": "${tokenFor("U2")}"  
}    

🍾
  `);
});
