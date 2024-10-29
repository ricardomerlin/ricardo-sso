const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
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

app.post('/toys', async (req, res) => {
  const apiUrl = 'https://seo.spot.im/v2/discussion-forum-posting/sp_vzzwOhsE/Toys';
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Cookie': 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsInZlcmlmaWVkIjpmYWxzZSwidXNlcl9pZCI6InVfaXZ1MWFWSngzNXpRIiwiZGlzcGxheV9uYW1lIjoiUmViZWNjYVRvbmctd2FiY19yYWRpbyIsInVzZXJfbmFtZSI6IlJlYmVjY2FUb25nLXdhYmNfcmFkaW8iLCJyZWdpc3RlcmVkIjp0cnVlLCJpbWFnZV9pZCI6IiNPbGl2ZS1UdXJ0bGUiLCJyb2xlcyI6W3siY29udGV4dCI6InN5c3RlbSIsIm5hbWUiOiJyZWdpc3RlcmVkIn0seyJjb250ZXh0Ijoic3lzdGVtIiwibmFtZSI6InN1cGVyLWFkbWluIn1dLCJzc29fZGF0YSI6bnVsbCwicHJvdmlkZXJzIjpudWxsLCJyZXB1dGF0aW9uIjp7InRvdGFsIjoxfSwibG9jYXRpb24iOiIiLCJpc19tb2RlcmF0aW9uX3ZpZXdlciI6ZmFsc2UsInNwb3RfaWQiOiJzcF9jTjU1amhTRCIsImxhc3RfY2hlY2siOjE3MjMxMzI3NDEsInZlcnNpb24iOjIsIngtc3BvdGltLXRva2VuIjoiMDEyNDA4MDh4ajZvV2IuYWRmMjEwYzY2ODI3YjhiNjMzNmU5YzcxYzM0MTgzYzMxZmU0ZmMzYjk4YjJhNWQ5NjUyODZjN2I2ZTBkMjM3OSIsInBlcm1pc3Npb25zIjpudWxsLCJzcG90aW0tZGV2aWNlLXYyIjoiZF9xek1VaDBxQWd3MGpLakRNWGl5cyIsIm5ldHdvcmsiOnsibmV0d29ya19pZCI6Im5ldF93YWJjX3JhZGlvIiwibmV0d29ya19uYW1lIjoid2FiY19yYWRpbyIsIm5ldHdvcmtfaW1hZ2VfaWQiOiI5YmYyYzJiYWZkZWY4YTA0YjQ1ZDg0Nzg4ZWZjNWE4NSIsIm5ldHdvcmtfY29sb3IiOiIifSwic3BvdF9uYW1lIjoiIiwiZG9tYWluIjoiIiwicm9sZXNfbnVtYmVyIjowLCJ0ZW1wX3VzZXIiOmZhbHNlLCJleHAiOjE3NTE1NTQ3NDEsInN1YiI6InVfaXZ1MWFWSngzNXpRIn0.fS-8UUqrucvl1IGW12-SZ8PUeEOYTWWGbrnrAzFebK4; device_uuid=65cf3b5f-01e4-4bdf-81a3-bce0da4acd06'
      }
  };

  try {
      const response = await fetch(apiUrl, requestOptions);
      
      const data = await response.text();

      if (!response.ok) {
          return res.status(response.status).send(data);
      }
      console.log(data)
      res.send(data)
  } catch (error) {
      console.error('Error posting to discussion forum:', error);
      res.status(500).send('Error occurred while posting');
  }
});


app.post('/start-handshake', async (req, res) => {
  const { code_a, userToken } = req.body;

  console.log(req.body.code_a);
  console.log(code_a);
  
  try {
    const response = await fetch(`https://www.spot.im/api/sso/v1/register-user?code_a=${req.body.code_a}&access_token=${ssoToken}&primary_key=${userToken.id}&spot_id=sp_vzzwOhsE&user_name=${userToken.username}&display_name=${userToken.displayName}&email=${userToken.email}&email_verified=${userToken.email_verified}&image_url=${userToken.imageURL}&user_metadata=ewogICAgImlzX3N1YnNjcmliZXIiOiB0cnVlCn0==&private_profile=${userToken.privateProfile}`, {
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