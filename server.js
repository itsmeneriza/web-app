const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const characterRoutes = require('./routes/characterRoutes');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (Front-end)
app.use(express.static(path.join(__dirname, 'public')));

// Character routes
app.use('/lionking', characterRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
