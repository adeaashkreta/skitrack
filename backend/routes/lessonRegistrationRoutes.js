const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonRegistrationController');

router.post('/', lessonController.createRegistration);
router.get('/', lessonController.getRegistrations);
router.get('/:id', lessonController.getRegistrationById);
router.put('/:id', lessonController.updateRegistration);
router.delete('/:id', lessonController.deleteRegistration);

module.exports = router;
