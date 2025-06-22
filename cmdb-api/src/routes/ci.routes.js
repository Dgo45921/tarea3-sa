const express = require('express');
const router = express.Router();
const ciController = require('../controllers/ci.controller');

// CRUD
router.post('/', ciController.createCI);
router.get('/', ciController.getAllCIs); // + filters
router.get('/:id', ciController.getCIById);
router.put('/:id', ciController.updateCI);
router.delete('/:id', ciController.deleteCI);

module.exports = router;
