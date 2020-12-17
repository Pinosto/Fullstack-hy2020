const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

function getRandomIntInclusive() {
    min = Math.ceil(1);
    max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

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






let persons = [{
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
},
{
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
},
{
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
},
{
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
}]

app.get('/', (request, response) => {
    response.send('<h1>all responses</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
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
    const containsPerson = persons.find(p => p.name === body.name)
    if (containsPerson) {
        return response.status(400).json({
            error: `${containsPerson.name} is allready in list`
        })
    }


    const randomId = getRandomIntInclusive()
    console.log(randomId)

    const person = {
        id: randomId,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)


})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        persons = persons.filter(p => p.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>                    
                    <p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})
console.log('Hello user')