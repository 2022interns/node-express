var express = require('express');
var router = express.Router();
const graphController = require('../controllers/graphController');


router.post('/find',graphController.findMeetingTimesApi);
router.get('/',graphController.findMeetingTimesget);
router.post('/sugg',graphController.suggest);
router.post('/create',graphController.CreateEvent);
router.post('/createAll',graphController.CreateEvents);

module.exports = router;
