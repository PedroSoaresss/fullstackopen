import express from "express";
import morgan from "morgan";

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

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  if (persons.some((p) => p.name === name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const id = Math.floor(Math.random() * 1000000);
  const newPerson = { id, name, number };
  persons.push(newPerson);

  res.status(201).json(newPerson);
});

app.get("/api/persons/created", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.get("/info", (req, res) => {
  const count = persons.length;
  const now = new Date();

  res.send(`
    <div>
      <p>Phonebook has info for ${count} people</p>
      <p>${now}</p>
    </div>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
