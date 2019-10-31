const express = require('express');
const userDb = require('./userDb.js');
const isEmpty = require('../utils/isEmpty.js');

const router = express.Router();
router.use(validateUser);

router.post('/', (req, res) => {
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(error => {
      res
        .status(500)
        .send({ message: 'There was a dang error creating the user.' });
    });
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {
  const { name } = req.body;

  if (isEmpty(req.body)) {
    res.status(400).send({
      message: 'missing user data'
    });
  } else if (!name) {
    res.status(400).send({
      message: 'missing required name field'
    });
  }

  next();
}

function validatePost(req, res, next) {}

module.exports = router;
