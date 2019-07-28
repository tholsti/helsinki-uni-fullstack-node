const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
]

const nameExists = name => {
  return !!persons.find(person => person.name.toLowerCase() === name.toLowerCase());
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (req, res) => {
  res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === Number(id));

  if (person) {
    return res.json(person)
  } else {
    return res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  const personsUpdated = persons.filter(person => person.id !== Number(id));
  persons = personsUpdated;
  
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (nameExists(name)) {
    res.status(404).send({error: 'Name already exists'});
    return;
  }

  if (!name || !number) {
    res.status(404).send({error: 'Please provide name and number'})
    return;
  }

  const newPerson = {
    id: (Math.random() * 1000000).toFixed(0),
    name,
    number,
  };

  persons = [
    ...persons,
    newPerson,
  ]

  res.json(newPerson);
});

app.get('/api/info', (req, res) => {
  res.send(`
    <div>Phonebook has information for ${persons.length} people</div>
    <div>${new Date}</div>
    `);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
