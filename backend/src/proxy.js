// backend/src/proxy.js

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { cwd } from 'process';

console.log(cwd());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

app.get('/geocode', async (req, res) => {
  try {
    const address = req.query.q;
    if (!address) {
      return res.status(400).json({ message: 'Missing query parameter "q"' });
    }
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching geocode data' });
  }
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

const port = 3001;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});