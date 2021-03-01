const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const ObjectId = require('mongodb').ObjectID
const { UserInputError } = require('apollo-server')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
require('dotenv').config()
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET;

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            book = new Book
            try {

                if (args.author && args.genre) {
                    const author = await Author.findOne({ name: args.author })
                    book = Book.find({
                        $and: [
                            { author: { $eq: author.id } },
                            { genres: { $in: [args.genre] } }
                        ]
                    })
                        .populate({ path: 'author' })
                }
                else if (args.author) {
                    const author = await Author.findOne({ name: args.author })
                    book = Book.find({ author: { $eq: author.id } })
                        .populate({ path: 'author' })
                }
                else if (args.genre) {
                    book = Book.find({ genres: { $in: [args.genre] } })
                        .populate({ path: 'author' })
                } else {
                    book = Book.find({}).populate({ path: 'author' })
                }

            } catch (error) {
                throw new Error(error.message)
            }
            return book
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            if (context.currentUser) {
                return context.currentUser
            }
        }
    },
    Author: {
        bookCount: (root) => {
            return   root.books.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            try {
                const isBookInLibrary = await Book.findOne({ title: args.title })
                if (isBookInLibrary) {
                    throw new Error('book is allready in library')
                }
                const isAuthorInDb = await Author.findOne({ name: args.author })
                const author = isAuthorInDb ?
                    isAuthorInDb :
                    await new Author({ name: args.author }).save()

                book = await new Book({ ...args, author }).save()
                const newaUTHOR = await Author.findByIdAndUpdate(author.id,{$push:{books:book.id}})

            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args, })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {

            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

module.exports = resolvers;