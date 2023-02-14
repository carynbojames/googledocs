const { AuthenticationError } = require('apollo-server-express')
const { Book, User } = require('../models')
const { signToken } = require('../utils')

const resolvers = {
	Query: {
		user: async () => {}, 

		books: async () => {
			return await User.find({}) /// User is not the model
		// 	return await Book.find({})
		},
		/// Why is users not turning yellow?
		// users: aysnc () => {
		// 	return await User.find({}).populate()
		// }
	},

	Mutation: {
		createUser: async (parent, { username, email, password }) => {
			const profile = await User.create({ username, email, password })
			const token = signToken(profile)
			return { token, profile }
		},

		login: async (parent, { username, password }) => {
			const profile = await User.findOne( { username })

			if (!profile) {
				throw new AuthenticationError('No profile with this username found')
			}

			/// Where does isCorrectPassword method (?) come from?
			const correctPw = await profile.isCorrectPassword(password)

			if (!correctPw) {
				throw new AuthenticationError('Incorrect password')
			}

			const token = signToken(profile)
			return { token, profile }
		},

		saveBook: async (parent) => {
			const book = await Book.create(args)
			return book 
		},
		deleteBook: async (parent) => {}
	}
}

module.exports = resolvers

/// QUESTION
/// 1. If we create these queries and mutations, then do other things need to be commented out?
/// 2. When do you use args vs parameters for the mutations?  