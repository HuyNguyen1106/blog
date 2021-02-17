const express = require('express');
const router = express.Router();
const ctrl = require('../app/controllers/MyController');

router.get('/stored/courses', ctrl.myCourses);
router.get('/trash/courses', ctrl.myTrashCourses);

module.exports = router;
