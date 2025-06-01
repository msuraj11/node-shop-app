const express = require('express');
const fs = require('fs');

const app = express();

const users = [];

app.use(express.json()); // parses application/json
app.use(express.urlencoded({ extended: true }));

app.post('/create-user', (req, res) => {
  const {userName} = req.body;
  users.push(userName);
  fs.writeFile('message.txt', users.join(',\n'), err => {
    res.statusCode = 302;
    res.redirect('/');
  });
});

app.use('/', (req, res) => {
  res.send(`<body>
              <form action="/create-user" method="POST">
                <label>Enter your name</label>
                <input required type="text" name="userName" />
                <button type="submit">Send</button>
                <ul>
                    ${users.length > 0 ?
                      users.map(user => `<li>${user}</li>`).join('') : ''
                    }
                </ul>
              </form>
            </body>
            <script>
              document.querySelector('input').focus();
            </script>`
          );
});

app.listen(3000);
