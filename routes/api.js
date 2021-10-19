const express = require('express');
const multipart = require('connect-multiparty');
const asyncHandler = require('express-async-handler');
const recordController = require('@app/http/controllers/api/recordController');

const {
  auth
} = require('@app/http/middlewares');
const multipartMiddleware = multipart();

const router = express.Router();
router.get('/records', [], asyncHandler(recordController.post));

module.exports = router;