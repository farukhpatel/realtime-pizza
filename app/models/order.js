const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: { type: String, required: true ,default: 'order_placed'},
    items: { type: Object, required: true },
    address: { type: String, required: true ,},
    phone: { type: String, required: true },
    paymentType: { type: String, default: 'COD' },



}, { timestamps: true })
const Order = new mongoose.model('Order', orderSchema)
module.exports = Order;