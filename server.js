const express = require('express');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();
server.use(express.json());
server.use(logger);

server.use('/api/post', postRouter);

server.use('/api/user', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Incoming ${req.method} request from ${req.originalUrl}`);
  next();
}

module.exports = server;
