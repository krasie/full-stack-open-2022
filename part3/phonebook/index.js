const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()


app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(express.static('build'))
app.use(express.json()) 

morgan.token('post', (req, res) => { 
    return JSON.stringify(req.body)
})


let persons = [
    {
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
    }
]



app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br>${Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)
    response.status(204).end()
})

app.post('/api/persons',(request,response) =>{
    const body = request.body
    if(!body.name){
        res = {
            error: "name must be unique"
        }
    }if(persons.find( person => person.name === body.name)){
        res = {
            error: "name already in the phonebook"
        }
    }else{
        const id = Math.floor(Math.random() * 9999999999)
        const person ={
            id:id,
            name:body.name,
            number:body.number
        }
        persons = persons.concat(person)
        res = person
    }
    response.json(res)
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})