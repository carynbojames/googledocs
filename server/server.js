const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express') /// added
const db = require('./config/connection'); 
const routes = require('./routes'); /// not needed

const { typeDefs, resolvers } = require('./schemas') /// added

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs, 
  resolvers,
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes); /// not needed


const startApolloServer = async (typeDefs, resolvers) => {
  await server.start()
  server.appllyMiddleware({ app })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
}

startApolloServer(typeDefs, resolvers) /// added