const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.post('/create', characterController.createCharacter);
router.put('/update/:id', characterController.updateCharacter);
router.delete('/delete/:id', characterController.deleteCharacter);

module.exports = router;
