// Setup the route
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '922990',
  key: 'd09e7a04d86c900edb08',
  secret: '93238759982321d01561',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
  // Every route should have a request and response
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    // Trigger pusher
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });
    return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;
