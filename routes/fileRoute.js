var express = require('express');
var router = express.Router();
const fileController = require('../controllers/fileController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads/mentors'
});
router.post('/mentors',multipartMiddleware,fileController.getmentorsfile); 
router.get('/mentors',fileController.readmentors);
router.get('/newjoiners',fileController.readnewjoiners);

module.exports = router;