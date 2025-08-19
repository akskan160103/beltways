const express = require('express');
const path = require('path');
const app = express();

const staticPath = path.join(process.cwd(), 'dashboard');
console.log('Serving static files from:', staticPath);
app.use(express.static(staticPath));

app.listen(4000, () => {
  console.log('Test static server running at http://localhost:4000/');
});