var DriverSchema = require('./drivers');
var TripSchema = require('./trips');
var RiderSchema = require('./riders');


module.exports = {
    Driver: DriverSchema.Driver,
    Trip: TripSchema.Trip,
    Rider: RiderSchema.Rider,
}