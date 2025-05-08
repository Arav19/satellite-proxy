const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'H2RXYY-XX2QJX-D5M6PY-5GYR';

app.use(cors());

app.get('/', (req, res) => res.send('Satellite Proxy Running!'));

app.get('/satellites', async (req, res) => {
  const { lat, lon, alt = 0 } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon' });
  }

  const url = `https://www.n2yo.com/rest/v1/satellite/above/${lat}/${lon}/${alt}/90/0/&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch satellite data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
