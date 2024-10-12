import express from 'express';
const router = express.Router();

router.get('/todos', (req, res) => {
    res.send('All Todos');
});

router.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Getting TODO with id ${id}`);
});

router.post('/todos', (req, res) => {
    res.json({ id: 1, title: "Todo", description: "My todo" });
});

router.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Updating TODO with id ${id}`);
});

router.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Deleting TODO with id ${id}`);
});

export default router;