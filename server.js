const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Character routes
app.use('/lionking', characterRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
