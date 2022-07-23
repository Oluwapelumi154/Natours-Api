const dotenv = require('dotenv');

dotenv.config();

const http = require('http');

const { db } = require('./src/config');

const app = require('./src/app');

/**
 *  Normalize a port into a number,string  or false;
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const PORT = normalizePort(process.env.PORT);
const server = http.createServer(app);
server.listen(PORT, () => {
  db.sequelize.sync().then(() => {
    console.log(`Application listening on Port ${PORT}`);
  });
});
