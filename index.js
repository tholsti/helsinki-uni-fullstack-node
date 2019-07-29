require('dotenv').config();

const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then((people) => {
            res.json(people.map(person => person.toJSON()));
        });
});

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;
    Person.findById(id).then((person) => {
        if (!person) {
            res.status(404).end();
        } else {
            res.json(person);
        }
    })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;

    Person.findByIdAndRemove(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body;

    if (!name || !number) {
        res.status(404).send({ error: 'Please provide name and number' });
        return;
    }

    const newPerson = new Person({
        name,
        number,
    });

    newPerson.save()
        .then((savedPerson) => {
            res.json(savedPerson);
        })
        .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;

    Person.findOne({ name })
        .then((person) => {
            person.updateOne({ number }, { runValidators: true })
                .then(() => {
                    res.sendStatus(204).end();
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
});

app.get('/api/info', (req, res) => {
    Person.find({})
        .then((persons) => {
            res.send(`
                <div>Phonebook has information for ${persons.length} people</div>
                <div>${new Date()}</div>
            `);
        });
});

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    }

    next(error);
    return null;
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
