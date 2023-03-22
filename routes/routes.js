const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/verify-token')

const userController = require('../controllers/userController')
const itemsController = require('../controllers/itemsController')
const chatController = require('../controllers/chatController')

// Router about user
router.post('/register', userController.register)
router.post('/login', userController.login)

// Router about Item
router.get('/view-all-items', verifyToken,itemsController.getItems);
router.get('/items/:id', itemsController.getItemsById);
router.post('/add-item', itemsController.addItems);
router.put('/update/:id', itemsController.updateItems);
router.delete('/delete/:id', itemsController.deleteItems);

router.get('/chat', chatController.chat)

module.exports = router;