require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person')

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.json(people.map(person => person.toJSON()));
    });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id).then(person => {
    if (!person) {
      res.status(404).end();
    } else {
      res.json(person);
    }
  })
  .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  console.log('name is' , name)

  if (!name || !number) {
    res.status(404).send({error: 'Please provide name and number'})
    return;
  }

  const newPerson = new Person ({
    name,
    number,
  });
  
  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson);
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  console.log(name, number);

  Person.findOne({ name })
    .then(person => {
      console.log('loytyi', person)
      person.updateOne({ number })
      .then(result => {
        res.sendStatus(204).end();
      });
      
    })
    .catch(error => next(error));
})

app.get('/api/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send(`
        <div>Phonebook has information for ${persons.length} people</div>
        <div>${new Date}</div>
      `);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
