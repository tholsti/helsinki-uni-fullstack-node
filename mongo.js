const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://fullstack:${password}@cluster0-sq0bn.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (!name && !number) {
  console.log('phonebook');
  Person.find({}).then(res => {
    res.forEach( note => {
      console.log(`${note.name} ${note.number}`);
    });
    mongoose.connection.close();
  })
} else {
    const person = new Person({
      name,
      number,
    })
    
    person.save().then(response => {
      console.log(`added ${name} ${number} to phonebook`);
      mongoose.connection.close();
    })
}

