const express = require('express')
const router = express.Router()


const userController = require('../controllers/user')

router.get('/', userController.getUsers)
router.post('/register', userController.registerUser) 
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.loginUsers)

module.exports = router;