const express = require('express');
const router = express.Router();
const ctrl = require('../app/controllers/CourseController');

router.get('/create', ctrl.create);
router.post('/store', ctrl.store);
router.post('/multiple-actions', ctrl.multipleActions);
router.get('/:slug', ctrl.show);
router.get('/:id/edit', ctrl.edit);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);
router.patch('/:id/restore', ctrl.restore);
router.delete('/:id/force', ctrl.forceDestroy);
router.get('/', ctrl.index);

module.exports = router;
