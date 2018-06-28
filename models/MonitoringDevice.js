var mongoose = require('mongoose');

var MonitoringDeviceSchema = new mongoose.Schema({
    location: String,
    address: Number,
    phases: Number,
    unitId: Number,
    unitPhase:Number
});

module.exports = mongoose.model('MonitoringDevice', MonitoringDeviceSchema);