const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});

router.post('/insertValue', (req, res, next) => {
  api.insertValue(req, res, next);
});

router.post('/insertCart', (req, res, next) => {
  api.insertCart(req, res, next);
});

router.get('/getCart', (req, res, next) => {
  api.getCart(req, res, next);
});

router.post('/deleteCart', (req, res, next) => {
  api.deleteCart(req, res, next);
});

module.exports = router;