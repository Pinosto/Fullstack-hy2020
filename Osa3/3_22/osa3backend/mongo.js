const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
console.log(password)

const url = `mongodb+srv://full_stack_20_jp:${password}@cluster0.b2vgn.mongodb.net/numbers-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv.length === 3) {
    console.log('haku')
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    // eslint-disable-next-line no-unused-vars
    person.save().then(response => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
if (process.argv.length === 4 || process.argv.length > 5) {
    console.log('format is: node mongo.js <yourpassword> "<name lastname>" <number>')
    mongoose.connection.close()

}
