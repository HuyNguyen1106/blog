const express = require('express');
const router = express.Router();
const ctrl = require('../app/controllers/CourseController');

router.get('/:slug', ctrl.show);
router.get('/', ctrl.index);

module.exports = router;
