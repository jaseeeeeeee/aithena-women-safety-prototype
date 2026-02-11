const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
