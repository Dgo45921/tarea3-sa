const express = require('express');
const router = express.Router();
const changeLogController = require('../controllers/changeLogs.controller');

router.get('/:id/changelog', changeLogController.getChangeLogForCI);
router.post('/:id/changelog', changeLogController.addChangeLog); // { summary }

module.exports = router;
