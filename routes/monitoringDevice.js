var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MonitoringDevice = require('../models/MonitoringDevice.js');

/* Get All monitoring devices. */
router.get('/', function(req, res, next) {
  MonitoringDevice.find({},{"__v":0},function(err,monDevices){
    console.log("getting");
    if(err) return next(err);
    res.json(monDevices);
  });
  
});

/* GET monitoring device by id. */
router.get('/:id', function(req, res, next) {
  MonitoringDevice.findById(req.params.id, function(err,monDevice){

    if(err) return next(err);
    res.json(monDevice);
  });
});


/* SAVE Hero */
router.post('/', function(req, res, next) {
  console.log("posting");
  MonitoringDevice.create(req.body, function (err, monDevice) {
    console.log("creating");
    if (err) return next(err);
    res.json(monDevice);
  });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  MonitoringDevice.findByIdAndUpdate(req.params.id, req.body, function (err, monDevice) {
    if (err) return next(err);
    res.json(monDevice);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  MonitoringDevice.findByIdAndRemove(req.params.id, req.body, function (err, monDevice) {
    if (err) return next(err);
    res.json(monDevice);
  });
});

module.exports = router;