const Order = require('./../../../models/order');
require('./../../../models/user');

function orderController() {
    return {
        async index(req, res) {
          Order.find({status:{$ne:'completed'}}, null, { sort: { 'createdAt': -1 } })
            .populate('customerId','-password')
            .exec((err, orders) => {
                if (req.xhr) {
                    console.log(orders);
                    return res.json(orders);
                } else {
                    res.render('admin/orders');
                }
            })
        }
    }
}
module.exports = orderController;