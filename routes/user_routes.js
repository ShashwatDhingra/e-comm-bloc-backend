const router = require('express').Router();
const userController = require('../controller/user_controller')

router.post('/createAccount', userController.createAccount)
router.post('/signIn', userController.signIn);

module.exports = router;