const express = require('express');
const router = express.Router();
const ctrl = require('../app/controllers/SiteController');

router.get('/search', ctrl.search);
router.get('/', ctrl.index);

module.exports = router;
