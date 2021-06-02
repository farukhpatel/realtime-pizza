const Order = require('../../../models/order');
function statusController() {
    return {
        async index(req, res) {
            Order.updateOne({ _id: req.body.orderId },
                { status: req.body.status }, function (err, docs) {
                    if (err) {
                        console.log(err)
                        return res.redirect('/admin/orders');
                    }
                    else {
                        console.log("Updated Docs : ", docs);
                        return res.redirect('/admin/orders');
                    }
                });

        }
    }
}
module.exports = statusController;