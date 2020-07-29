import express from 'express';
import data from './data';

const app = express();

app.get('/api/products', (req, res) => {
    
    res.send(data.products);
    })

app.listen(3001, () => { console.log("Server is running at at http://localhost:3001") })