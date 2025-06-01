const express = require('express');
const fs = require('fs');

const app = express();

const users = [];

app.use(express.json()); // parses application/json
app.use(express.urlencoded({ extended: true }));

// app.use('/create-user', (req, res, next) => {
app.post('/create-user', (req, res, next) => {
  //const method = req.method;
  console.log(req.body);
  const body = [];
  //if (method === 'POST') {
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];
      console.log(userName);
      users.push(userName);
      fs.writeFile('message.txt', userName, err => {
        res.statusCode = 302;
        //next();
        res.redirect('/');
      });
    });
  //}
});

app.use('/', (req, res) => {
  res.send(`<body>
              <form action="/create-user" method="POST">
                <label>Enter your name</label>
                <input type="text" name="username" />
                <button type="submit">Send</button>
                <ul>
                    ${users.length > 0 ?
                      users.map(user => `<li>${user}</li>`).join('') : ''
                    }
                </ul>
              </form>
            </body>`);
});

app.listen(3000);
