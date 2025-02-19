const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World client');
});

app.listen(PORT, () => {
  console.log(`Client: running on http://localhost:${PORT}`);
});
