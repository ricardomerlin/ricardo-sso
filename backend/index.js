const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
// require('dotenv').config({ path: './backend/.env' });
require('dotenv').config();

const app = express();
const port = 3001;
const dbPath = path.join(__dirname, 'db.json');
const secretKey = process.env.SECRET_KEY;
const ssoToken = process.env.SSO_TOKEN;

console.log(secretKey)
console.log(ssoToken)

const corsOptions = {
    origin: 'https://ricardo-sso.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    const db = JSON.parse(data)
    res.json(db)
  })
})

app.get('/users', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    const db = JSON.parse(data);
    res.json(db.users);
  });
});

app.get('/users/:id', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    const db = JSON.parse(data);
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User Not Found');
    res.json(user);
  });
});

app.get('/sso_errors', (req, res) => {
  fs.readFile(dbPath), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    const db = JSON.parse(data)
    res.json(db.sso_errors)
  }
})

app.post('/users', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Internal Server Error');
    const db = JSON.parse(data);

    const newUser = {
      id: uuidv4(),
      ...req.body,
      privateProfile: req.body.privateProfile || false,
      email_verified: req.body.email_verified || false,
    };

    console.log(newUser);

    db.users.push(newUser);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
      if (err) return res.status(500).send('Internal Server Error');
      res.status(201).json(newUser);
    });
  });
});

app.post('/start-handshake', async (req, res) => {
  const { code_a, userToken } = req.body;

  console.log(req.body.code_a);
  console.log(code_a);

  try {
    const response = await fetch(`https://www.spot.im/api/sso/v1/register-user?code_a=${req.body.code_a}&access_token=${ssoToken}&primary_key=${userToken.id}&spot_id=sp_5esW6NWZ&user_name=${userToken.username}&display_name=${userToken.displayName}&email=${userToken.email}&email_verified=${userToken.email_verified}&image_url=${userToken.imageURL}&private_profile=${userToken.privateProfile}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-spotim-sso-access-token': ssoToken,
      }
    });

    const code_b = await response.text();
    console.log('HERE IS THE CODEB:', code_b);

    res.send(code_b);
    console.log('codeB was sent to FE');
  } catch (error) {
    console.error('Error fetching code_b:', error);
    res.status(500).send('Error occurred');
  }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Internal Server Error');
      const db = JSON.parse(data);
      console.log(username)
      console.log(password)
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
          name: user.name,
          displayName: user.display_name,
          email_verified: user.email_verified,
          imageURL: user.image_url,
          privateProfile: user.private_profile,
          is_blocked: user.is_blocked
        }
      });
    });
  });

app.patch('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Internal Server Error');
      const db = JSON.parse(data);
      const userIndex = db.users.findIndex(user => user.id === userId);

      if (userIndex === -1) return res.status(404).send('User Not Found');

      db.users[userIndex] = { ...db.users[userIndex], ...updatedData };

      fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
          if (err) return res.status(500).send('Internal Server Error');
          res.json(db.users[userIndex]);
      });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});