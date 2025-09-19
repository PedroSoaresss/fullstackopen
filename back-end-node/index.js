// Rota para deletar uma pessoa por ID (MongoDB)
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});
// Rota para atualizar número de uma pessoa (MongoDB)
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});
// Middleware de erro
app.use((error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});
import express from "express";
import morgan from "morgan";
import Person from './person.js';

const app = express();

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.json());

const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Create a new person and save to MongoDB
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }
  Person.findOne({ name }).then(existingPerson => {
    if (existingPerson) {
      return res.status(400).json({ error: "Name must be unique" });
    }
    const person = new Person({ name, number });
    person.save()
      .then(savedPerson => {
        res.status(201).json(savedPerson);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });
});

// Get all persons from MongoDB
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Get info about the phonebook
app.get("/info", (req, res) => {
  Person.countDocuments({})
    .then(count => {
      const now = new Date();
      res.send(`
        <div>
          <p>Phonebook has info for ${count} people</p>
          <p>${now}</p>
        </div>
      `);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Get a person by ID from MongoDB
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
