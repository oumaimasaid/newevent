const sqlite3 = require('sqlite3').verbose();

// Connexion la base de données
let db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Base de données connectée.');
});

// Création de la table "event"
db.run(`CREATE TABLE IF NOT EXISTS events (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
categorie TEXT NOT NULL 
)`);

// Modèle de données pour représenter un utilisateur
class Event {
    constructor(name, categorie) {
        this.name = name;
        this.categorie = categorie;
    }

    // Enregistrer un nouvel utilisateur dans la base de données
    save(callback) {
        db.run(`INSERT INTO events (name, categorie) VALUES (?, ?, ?)`,
            [this.name, this.categorie], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                console.log(`Utilisateur ${this.name} ajouté avec l'ID ${this.lastID}`);
                callback(null, this.lastID);
            });
    }

    // Rechercher tous les utilisateurs dans la base de données
    static findAll(callback) {
        db.all(`SELECT * FROM events`, [], function (err, rows) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            const events = rows.map(row => new Event(row.name, row.categorie,
            ));
            callback(null, events);
        });
    }

    // Rechercher un utilisateur par ID dans la base de données
    static findById(id, callback) {
        db.get(`SELECT * FROM events WHERE id = ?`, [id], function (err, row) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            if (!row) {
                return callback(new Error('Utilisateur non trouvé'));
            }
            const event = new Event(row.name, row.categorie);
            callback(null, event);
        });
    }


    // Mettre à jour un utilisateur dans la base de données
    static updateById(id, name, categorie, callback) {
        db.run(`UPDATE events SET name = ?, categorie = ?WHERE id = ?`, [name, categorie, id], function (err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log(`Utilisateur avec l'ID ${id} mis à jour.`);
            callback(null);
        });
    }

    // Supprimer un utilisateur de la base de données
    static deleteById(id, callback) {
        db.run(`DELETE FROM events WHERE id = ?`, [id], function (err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log(`Utilisateur avec l'ID ${id} supprimé.`);
            callback(null);
        });
    }
}


module.exports = db;