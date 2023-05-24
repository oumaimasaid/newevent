// eventResolver.js
const db = require('./models');
// Implémentation des résolveurs GraphQL
const eventResolver = {
event: ({ id }) => {
    return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM events WHERE id = ?`, [id], (err, row) => {
    if (err) {
    reject(err);
    } else {
    resolve(row);
    }
    });
    });
},
events: () => {
    return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM events`, [], (err, rows) => {
    if (err) {
    reject(err);
    } else {
    resolve(rows);
    }
    });
    });
},
addEvent: ({ name, categorie}) => {
    return new Promise((resolve, reject) => {
    db.run(`INSERT INTO events (name, categorie) VALUES (?, ?)`,
    [name, categorie], function(err) {
    if (err) {
    reject(err);
    } else {
    resolve({ id: this.lastID, name, categorie });
    }
    });
    });
},

deleteEvent: ({id}) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM events WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error(`Event with id ${id} not found`));
          } else {
            resolve(`Event with id ${id} deleted successfully`);
          }
        }
      });
    });
  }
  
};
module.exports = eventResolver;