const express = require('express');
const userDb = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(user => {
      console.log(user);
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

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
