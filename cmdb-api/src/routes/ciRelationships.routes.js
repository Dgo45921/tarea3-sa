const express = require('express');
const router = express.Router();
const ciRelController = require('../controllers/ciRelationships.controller');

router.get('/:id/relationships', ciRelController.getRelationshipsForCI);
router.post('/:id/relationships', ciRelController.addRelationship); // { childId }
router.delete('/:id/relationships/:childId', ciRelController.removeRelationship);

module.exports = router;
