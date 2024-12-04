const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Initialize database and table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS character (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        species TEXT NOT NULL,
        description TEXT NOT NULL,
        movie_quote TEXT NOT NULL
    )`);
});

module.exports = db;
