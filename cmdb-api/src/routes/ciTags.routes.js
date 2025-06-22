const express = require('express');
const router = express.Router();
const ciTagsController = require('../controllers/ciTags.controller');

router.get('/:id/tags', ciTagsController.getTagsForCI);
router.post('/:id/tags', ciTagsController.addTagToCI);
router.delete('/:id/tags/:tag', ciTagsController.removeTagFromCI);

module.exports = router;
