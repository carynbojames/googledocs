const { Book, User } = require('../models')

const resolvers = {
	Query: {
		books: async () => {
			return await User.find({}) /// User is not the model
		// 	return await Book.find({})
		},
		/// Why is users not turning yellow?
		// users: aysnc () => {
		// 	return await User.find({}).populate()
		// }
	}
}

module.exports = resolvers