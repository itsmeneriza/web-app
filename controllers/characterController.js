const db = require('../models/characterModel');

const getAllCharacters = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const perPage = 5;
    const offset = (page - 1) * perPage;

    const query = `SELECT * FROM character WHERE name LIKE ? LIMIT ? OFFSET ?`;
    db.all(query, [`%${search}%`, perPage, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.get(`SELECT COUNT(*) AS total FROM character WHERE name LIKE ?`, [`%${search}%`], (err, countRow) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const totalRecords = countRow.total;
            const totalPages = Math.ceil(totalRecords / perPage);
            res.json({
                character: rows,
                totalPages: totalPages,
            });
        });
    });
};

const getCharacterById = (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM character WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json({ character: row });
    });
};

const createCharacter = (req, res) => {
    const { name, species, description, movie_quote } = req.body;
    if (!name || !species || !description || !movie_quote) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    db.run(
        'INSERT INTO character (name, species, description, movie_quote) VALUES (?, ?, ?, ?)',
        [name, species, description, movie_quote],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, name, species, description, movie_quote });
        }
    );
};

const updateCharacter = (req, res) => {
    const { id } = req.params;
    const { name, species, description, movie_quote } = req.body;

    if (!name || !species || !description || !movie_quote) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
        'UPDATE character SET name = ?, species = ?, description = ?, movie_quote = ? WHERE id = ?',
        [name, species, description, movie_quote, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Character not found' });
            }
            res.json({ message: 'Character updated successfully' });
        }
    );
};

const deleteCharacter = (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM character WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json({ message: 'Character deleted successfully' });
    });
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
