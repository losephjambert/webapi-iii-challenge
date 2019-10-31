const express = require('express');
const userDb = require('./userDb.js');
const postDb = require('../posts/postDb.js');
const isEmpty = require('../utils/isEmpty.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
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

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { user } = req;
  const post = {
    text: req.body.text,
    user_id: user.id
  };
  postDb
    .insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log('Create new post error: ', error);
      res.status(500).json({ message: 'Error saving new post to database' });
    });
});

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log('Error retrieving users: ', error);
      res
        .status(500)
        .json({ message: 'Error retrieving users from the database' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error retrieving that user from the database'
      });
    });
}

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

function validatePost(req, res, next) {
  const post = req.body;
  if (isEmpty(post)) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!post.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
