// Setup the route
const express = require('express');
const router = express.Router();

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
  res.send('Poll');
});

router.post('/', (req, res) => {
  // Trigger pusher
  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os
  });
  return res.json({ success: true, message: 'Thank you for voting' });
});

module.exports = router;
