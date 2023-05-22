var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index')
const auth = require('../common/auth')

router.get('/', indexController.handleHome);

//apply leave
router.post('/apply-leave',auth.validate,indexController.handleApplyLeave)

//change status of leave by admin only
router.put('/change-status/:id/:toStatus',auth.validate,auth.roleAdmin, indexController.handleChangeStatus)

//cancle leave on user side
router.put('/cancel-leave/:id',auth.validate, indexController.handleCancelLeave)

//get details of selected leave id
router.get('/leave/:id',auth.validate,indexController.handleGetLeaveById)

//list all leaves based on status
router.get('/leaves/:status',auth.validate,auth.roleAdmin,indexController.handleGetLeaveByStatus)

//list all leaves of a user
router.get('/users-leaves/:id',auth.validate,indexController.handleGetLeavesByUser)

module.exports = router;