const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET: Nährstoffdaten aus JSON-Datei
app.get('/api/nutrients', (req, res) => {
  const data = JSON.parse(fs.readFileSync('nutrients.json', 'utf-8'));
  res.json(data.nutrients);
});

// POST: Nährstoffdaten speichern
app.post('/api/nutrients', (req, res) => {
  const newNutrients = req.body; // Array der nutrients
  fs.writeFileSync('nutrients.json', JSON.stringify({ nutrients: newNutrients }, null, 2));
  res.status(200).json({ message: 'Erfolgreich gespeichert!' });
});

// Alle anderen Routen auf index.html leiten
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
