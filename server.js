// Load environment variables
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Access the API key from the environment variable
const API_KEY = process.env.API_KEY;

app.get('/satellites', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `https://www.n2yo.com/rest/v1/satellite/above/${lat}/${lon}/0/90/0/&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching satellite data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
