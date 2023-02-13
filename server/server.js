/// Reference: Activity 15
const express = require('express');
const { ApolloServer } = require('apollo-server-express') /// added
const path = require('path');

const { typeDefs, resolvers } = require('./schemas') /// added
const db = require('./config/connection'); 

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs, 
  resolvers,
})

const routes = require('./routes'); /// not needed
app.use(routes); /// not needed

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

/// modified
/// Create a new instance of the Apollo sever with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start()
  server.appllyMiddleware({ app })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      /// QUESTION: graphqlPath. Is that a given?
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
}

/// Call the async function to start the server
startApolloServer(typeDefs, resolvers) /// added