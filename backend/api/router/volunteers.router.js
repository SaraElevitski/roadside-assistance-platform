const express = require('express');
const router = express.Router();
const volunteersController = require('../../api/controllers/volunteer.controller.js');

router.post('/', volunteersController.create);

router.get('/', volunteersController.getAll);

router.put('/:id', volunteersController.update);

router.delete('/:id', volunteersController.delete);

router.post('/login', volunteersController.findOne);

module.exports = router;