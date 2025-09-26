const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// GET: Fetch all data
app.get('/data', (req, res) => {
  res.json(data);
});

// POST: Create new data
app.post('/data', (req, res) => {
  const newData = req.body;
  newData.id = data.length + 1;
  data.push(newData);
  res.status(201).json(newData);
});

// PATCH: Update existing data
app.patch('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  let found = false;
  
  data = data.map(item => {
    if (item.id === id) {
      item = { ...item, ...updatedData };
      found = true;
    }
    return item;
  });

  if (found) {
    res.json({ message: 'Data updated', data: updatedData });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// DELETE: Delete data
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter(item => item.id !== id);
  res.json({ message: 'Data deleted' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
