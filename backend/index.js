const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import uuid
require('dotenv').config();

const app = express();
const port = 3001;
const dbPath = path.join(__dirname, 'db.json');
const secretKey = process.env.SECRET_KEY;

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Internal Server Error');
    const db = JSON.parse(data);
    res.json(db.users);
  });
});

app.get('/users/:id', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Internal Server Error');
    const db = JSON.parse(data);
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User Not Found');
    res.json(user);
  });
});

app.post('/users', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Internal Server Error');
    const db = JSON.parse(data);
    
    const newUser = {
      id: uuidv4(),
      ...req.body
    };

    console.log(newUser)

    db.users.push(newUser);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
      if (err) return res.status(500).send('Internal Server Error');
      res.status(201).json(newUser);
    });
  });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Internal Server Error');
      const db = JSON.parse(data);
      const user = db.users.find(u => u.username === username && u.password === password);
  
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  
      console.log('User logged in:', user);
  
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstname: user.firstname
        }
      });
    });
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});