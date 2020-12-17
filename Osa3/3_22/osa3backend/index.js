const express = require('express')
const app = express()

require('dotenv').config()
const Person = require('./models/person')

const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())



morgan.token('customPost', function getPerson(reg) {
    if (reg.method === 'POST') {
        return JSON.stringify(reg.body)
    }
    return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :customPost'))

// let persons = [{
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
// },
// {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
// },
// {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
// },
// {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
// }]

app.get('/', (request, response) => {
    response.send('<h1>all responses</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log(`api vastaus: ${persons}`)
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person.toJSON())
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // console.log(request.headers)
    // console.log(request)
    // console.log(body)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log(`body on ${body}`)

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error => next(error)))

})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p>                    
                    <p>${new Date()}</p>`)
    })
})

//error handling

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})
console.log('Hello user')