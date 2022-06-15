var express = require('express');
var router = express.Router();
const graphController = require('../controllers/graphController');


router.get('/find',graphController.findMeetingTimes);

module.exports = router;
