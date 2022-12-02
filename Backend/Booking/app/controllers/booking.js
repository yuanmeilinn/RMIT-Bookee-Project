const Booking = require('../models/booking.js');
const mongoose = require('mongoose');

module.exports.createBooking = (booking) => {
    const newBooking = new Booking(booking);

    return newBooking.save();
};

module.exports.getBookings = (query, projection) => {
    return Booking.find(query, projection);
};

module.exports.getBookingsByStore = (id, state, canceled) => {
    const date = new Date(Date.now());

    if (state === 'current') {
        return Booking.find({
            $and: [
                {storeId: id},
                {canceled: canceled},
                {serviceDate: {$gte: date}}
            ]
        });
    } else if (state === 'concluded') {
        return Booking.find({
            $and: [
                {storeId: id},
                {canceled: canceled},
                {serviceDate: {$lt: date}}
            ]
        });
    } else {
        return Booking.find({
            $and: [
                {storeId: id},
                {canceled: canceled}
            ]
        });
    }
};

module.exports.getBookingsByUser = (id) => {
    return Booking.aggregate([
        {
            $match: { $and: [ { userId: id }, { canceled: false } ] }
        },
        {
            $project : {
                canceled: 0
            }
        },
        {
            $group : { _id : "$city", booking: { $push: "$$ROOT" } }
        }
    ])
};

module.exports.getBookingByUserBookId = (userId, bookId) => {
    return Booking.aggregate([
        {
            $match: { $and: [ { userId: userId }, { _id: mongoose.Types.ObjectId(bookId) } ] }
        },
        {
            $project : {
                canceled: 0
            }
        },
        {
            $group : { _id : "$city", booking: { $push: "$$ROOT" } }
        }
    ])
};

module.exports.getBookingsByUserCurrent = (id, date) => {
    return Booking.aggregate([
        {
            $match: {
                $and: [
                    { "userId": id },
                    { "canceled": false },
                    { serviceDate: {$gte: date} }
                ]
            }
        },
        { $sort : { serviceDate : 1 } },
        {
            $project : {
                canceled: 0
            }
        },
        {
            $group : { _id : "$city", booking: { $push: "$$ROOT" } }
        }
    ])
};

module.exports.getBookingsByUserConcluded = (id, date) => {
    return Booking.aggregate([
        {
            $match: {
                $and: [
                    { "userId": id },
                    { "canceled": false },
                    { serviceDate: {$lt: date} }
                ]
            }
        },
        { $sort : { serviceDate : -1 } },
        {
            $project : {
                canceled: 0
            }
        },
        {
            $group : { _id : "$city", booking: { $push: "$$ROOT" } }
        }
    ])
};

module.exports.getPopularStoreList = () => {
    return Booking.aggregate([
        {
            $match: {  "canceled": false }
        },
        {
            '$group': {
                '_id': '$storeId',
                'number_reservations': {$sum: 1}
            }
        }, {
            '$sort': {
                'number_reservations': -1
            }
        }/*, {
            '$limit': 10
        }*/
    ]);
}

module.exports.cancelBookings = (id) => {
    return Booking.findOneAndUpdate({_id: id}, {canceled: true}, { new: true} );
};

module.exports.dateExists = (date, storeId) => {
    return Booking.exists({serviceDate: date, storeId: storeId});
};

module.exports.getStoreFromID = (bookingID) => {
    return Booking.findOne({_id: bookingID}, {_id: 0, storeId: 1})
};

module.exports.getUserFromID = (bookingID) => {
    return Booking.findOne({_id: bookingID}, 'userId')
};

module.exports.reschedule = (id, bookingDate, serviceDate, slotId, service) => {
    if (service) {
        return Booking.findByIdAndUpdate(id, {
            serviceDate: serviceDate,
            slotId: slotId,
            bookingDate: bookingDate,
            service: service,
            wasRescheduled: true
        });
    }
    else {
        return Booking.findByIdAndUpdate(id, {
            serviceDate: serviceDate,
            slotId: slotId,
            bookingDate: bookingDate,
            wasRescheduled: true
        });
    }
};

module.exports.count = (storeId, date_i, date_f, canceled) => {
    /*
    return Booking.find({
        $and: [
            {
                storeId: storeId
            },
            {
                serviceDate: {
                    $gte: new Date(date_i),
                    $lt: new Date(date_f)
                }
            },
            {
                canceled: canceled
            }
        ]
    })
    */

    return Booking.aggregate([
        {
            $match: {
                $and: [
                    {
                        storeId: storeId
                    },
                    {
                        serviceDate: {
                            $gte: new Date(date_i),
                            $lt: new Date(date_f)
                        }
                    },
                    {
                        canceled: canceled
                    }
                ]
            }
        },
        {
            $group: {
                _id: '$_id',
                count: {$sum: 1}
            }
        },
        {
            $count: "count"
        }
    ]);
};

module.exports.getSlotCurrentCapacity = (slotId) => {
    return Booking.aggregate([
        {
            $match: {
                $and: [
                    { "slotId": slotId },
                    { "canceled": false },
                ]
            }
        },
        {
            $group: {
                _id: '$slotId',
                currentCapacity: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
};

module.exports.getSlots = (slotId) => {
    return Booking.find({slotId: slotId, canceled: false});
};

module.exports.getSlotIdFromBookingId = (bookingId) => {
    return Booking.findOne({_id: bookingId}, {_id: 0, slotId: 1});
};

module.exports.getStoreName = (bookingId) => {
    return Booking.findOne({_id: bookingId}, {_id: 0, storeName: 1});
};

module.exports.getServiceDate = (bookingId) => {
    return Booking.findOne({_id: bookingId}, {_id: 0, serviceDate: 1});
};

module.exports.bookingsDay = (storeId) => {
    return Booking.aggregate(
        [
            // Perform the initial match to filter docs by 'storeId' and 'canceled'
            {
                $match:
                    {
                        storeId: storeId,
                        canceled: false
                    }
            },
            // Extract the year, month and day portions of the 'serviceDate'
            {
                $project:
                    {
                        date: { $concat: [ "asd", " - ", "dsa" ] },
                        year: { $year: "$serviceDate" },
                        month: { $month: "$serviceDate" },
                        day: { $dayOfMonth: "$serviceDate" },
                        storeId: 1,
                        serviceDate: 1,
                        date:{$substr:["$serviceDate", 0, -1 ]}
                    }
            },
            // Convert year, month and day to String
            {
                $project:
                    {
                        storeId: 1,
                        serviceDate: 1,
                        day:{$substr:["$day", 0, -1 ]},
                        month:{$substr:["$month", 0, -1 ]},
                        year:{$substr:["$year", 0, -1 ]}
                    }
            },
            // Concat year, month and day into date
            {
                $project:
                    {
                        storeId: 1,
                        serviceDate: 1,
                        date: { $concat: [ "$year", "-", "$month", "-", "$day" ] }
                    }
            },
            {
                $group:{ _id: '$date', count: {$sum: 1} }
            },
            { $sort : { _id : 1 } }
        ]
    )

};
