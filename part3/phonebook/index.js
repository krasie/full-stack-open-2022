const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Phonebook = require('./models/person')


app.use(express.json()) 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())
app.use(express.static('build'))

morgan.token('post', (req) => { 
    return JSON.stringify(req.body)
})


app.get('/info', (request, response,next) => {
    Phonebook.find({}).then(phonebooks => {
        response.send(`Phonebook has info for ${phonebooks.length} people<br>${Date()}`)
    }).catch(
        error => next(error)
    )
})

app.get('/api/persons', (request, response,next) => {
    Phonebook.find({}).then(phonebooks => {
        response.json(phonebooks)
    }).catch(
        error => next(error)
    )
})

app.get('/api/persons/:id', (request, response,next) => {
    Phonebook.findById(request.params.id).then(phonebooks => {
        response.json(phonebooks)
    }).catch(
        error => next(error)
    )
})

app.delete('/api/persons/:id', (request, response,next) => {
    const id = request.params.id
    Phonebook.findByIdAndRemove(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons',(request,response,next) =>{
    const body = request.body
    if(!body.name){
        const res = {
            error: "name must be unique"
        }
        response.status(400).send(res)
    }else{
        Phonebook.find({name:body.name}).then(res =>{
            if(res.length !== 0){
                const resp = {
                    error: "name already in the phonebook"
                }
                response.status(400).send(resp)
            }else{
                const phonebook = new Phonebook({
                    name:body.name,
                    number:body.number
                })
                phonebook.save().then(savePhonebook =>  response.json(savePhonebook)).catch(error => next(error))
            }
        })
        
    }
})

app.put('/api/persons/:id',(request,response,next)=>{
    const body = request.body
    const phonebook = {
        name:body.name,
        number:body.number
    }
    Phonebook.findByIdAndUpdate(request.params.id,phonebook, { new: true, runValidators: true, context: 'query' }).then(
        updatePhonebook =>{
            response.json(updatePhonebook)
        }
    ).catch(
        error => next(error)
    )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
  }
  


app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})