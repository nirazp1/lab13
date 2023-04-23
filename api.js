import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());

let naturalResources = [
  { id: 1, name: 'Water', description: 'A colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.', quantity: 1000 },
  { id: 2, name: 'Wood', description: 'The hard fibrous material that forms the main substance of the trunk or branches of a tree or shrub.', quantity: 500 },
  { id: 3, name: 'Oil', description: 'A viscous liquid derived from petroleum, especially for use as a fuel or lubricant.', quantity: 100 },
  { id: 4, name: 'Coal', description: 'A combustible black or dark brown rock consisting mainly of carbonized plant matter, found mainly in underground deposits and widely used as fuel.', quantity: 200 }
];

// Get all natural resources
app.get('/', (req, res) => {
  res.send('Welcome to the Natural Resources API!');
});

app.get('/api/natural-resources/:id', (req, res) => {
    const naturalResource = naturalResources.find(nr => nr.id === parseInt(req.params.id));
    if (!naturalResource) {
      return res.status(404).json({ error: 'Natural resource not found' });
    }
    res.status(200).json(naturalResource);
  });
  

// Create a new natural resource
app.post('/natural-resources', (req, res) => {
  const naturalResource = {
    id: naturalResources.length + 1,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity
  };
  naturalResources.push(naturalResource);
  console.log('New natural resource created:', naturalResource);
  res.status(201).json(naturalResource);
});

// Update a natural resource by id
app.put('/natural-resources/:id', (req, res) => {
  const naturalResource = naturalResources.find(nr => nr.id === parseInt(req.params.id));
  if (!naturalResource) {
    return res.status(404).json({ error: 'Natural resource not found' });
  }
  naturalResource.name = req.body.name;
  naturalResource.description = req.body.description;
  naturalResource.quantity = req.body.quantity;
  console.log('Natural resource updated:', naturalResource);
  res.status(200).json(naturalResource);
});

// Delete a natural resource by id
app.delete('/natural-resources/:id', (req, res) => {
  const naturalResourceIndex = naturalResources.findIndex(nr => nr.id === parseInt(req.params.id));
  if (naturalResourceIndex === -1) {
    return res.status(404).json({ error: 'Natural resource not found' });
  }
  naturalResources.splice(naturalResourceIndex, 1);
  console.log('Natural resource deleted:', req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
