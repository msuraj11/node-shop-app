const http = require('http');
const fs = require('fs');

const users = [];
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Messsage</title></head>');
    res.write(`<body>
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
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];
      console.log(userName);
      users.push(userName);
      fs.writeFile('message.txt', userName, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
});

server.listen(3000);
