const router = require('express').Router();
const userController = require('../controller/user_controller')

router.post('/createAccount', userController.createAccount)
router.post('/signIn', userController.signIn);
router.put('/:id', userController.updateDetail);

module.exports = router;