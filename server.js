const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const eventSchema = require('./eventSchema');
const eventResolver = require('./eventResolver');
const app = express();
const port = 5000;
// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
schema: eventSchema,
rootValue: eventResolver,
graphiql: true
}));
// Utilisation de body-parser pour analyser les demandes HTTP
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Implémentation de l'API REST
app.get('/events', (req, res) => {
db.all(`SELECT * FROM events`, [], (err, rows) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(rows);
});
});

app.get('/event/:id', (req, res) => {
db.get(`SELECT * FROM events WHERE id = ?`, [req.params.id], (err, row) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(row);
});
});

app.post('/event', (req, res) => {
    const { name, categorie } = req.body;
    db.run(`INSERT INTO events (name, categorie) VALUES (?, ?)`, [name,categorie], (err) => {
    if (err) {
    res.status(400).json({ "error": err.message });
    return;
    }
    res.json({ "message": "success" });
    });
});

app.put('/event/:id', (req, res) => {
    const { name, categorie} = req.body;
    db.run(`UPDATE events SET name = ?, categorie = ? WHERE id = ?`, [name, categorie, req.params.id], (err) => {
        if (err) {
        res.status(400).json({ "error": err.message });
        return;
        }
        res.json({ "message": "success" });
    });
    });
    
app.delete('/event/:id', (req, res) => {
    db.run(`DELETE FROM events WHERE id = ?`, [req.params.id], (err) => {
        if (err) {
        res.status(400).json({ "error": err.message });
        return;
        }
        res.json({ "message": "success" });
    });
});
    
// Lancement du serveur
app.listen(port, () => {
console.log(`Serveur démarré sur le port ${port}.`);
});