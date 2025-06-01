const fs = require('fs');

let message = '';
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Messsage</title></head>');
    res.write(`<body>
                <form action="/message" method="POST">
                  <input type="text" name="message" />
                  <button type="submit">Send</button>
                  ${message.length > 0 ? `<h1>Hello ${message} from my Node.js server</h1>` : ''}
                </form>
              </body>`);
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      message = parsedBody.split('=')[1];
      // fs.writeFileSync Pauses the next line of executions until this read/write or any event is completed
      // fs.writeFileSync('message.txt', message);
      // fs.writeFile(<file>, <content-of-file>, callback) Callback executes when writing of file is done.
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html>');
  // res.write('<head><title>My first Node page</title></head>');
  // res.write('<body><h1>Hello ${message} from my Node.js server</h1></body>');
  // res.write('</html>');
  // res.end();
};

module.exports = requestHandler;
