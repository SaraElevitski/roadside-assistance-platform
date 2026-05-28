const express = require('express');
const router = express.Router();
const priorityController = require('../controllers/priority.controller');

router.get('/', priorityController.getAll);

module.exports = router;
