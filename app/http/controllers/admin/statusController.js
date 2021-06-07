const Order = require('../../../models/order');
function statusController() {
    return {
        async index(req, res) {
            Order.updateOne({ _id: req.body.orderId },
                { status: req.body.status }, function (err, docs) {
                    if (err) {
                        return res.redirect('/admin/orders');
                    }
                    else {
                        //event emit
                        const eventEmitter=req.app.get('eventEmitter');
                        eventEmitter.emit('orderUpdated',{id:req.body.orderId,status:req.body.status})
                        // console.log("Updated Docs : ", docs);
                        return res.redirect('/admin/orders');
                    }
                });

        }
    }
}
module.exports = statusController;