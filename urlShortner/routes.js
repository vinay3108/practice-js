const express = require('express');
const router = express.Router();
const { makeShortUrl, redirectUrl } = require('./controller');

router.post('/shorten', makeShortUrl);
router.get('/:short', redirectUrl);

module.exports = router;
