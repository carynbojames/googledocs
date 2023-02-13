const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Query {
    books: [Book]
    users: [User]
  }

### QUESTIONS
### 1. If one of the fields is an array, then does it get put into an array? 
### 2. How do you know if the field is required? 
### 3. For the field names, do they have to match wtih lower case and capital? 
### 4. If Mongoose is a number, then it's a float, int, etc in GQL. Actvitiy 9 > Professor model
`

module.exports = typeDefs