const Order = require('../../models/order');
function orderController() {
    return {
        store(req, res) {
            const { address, phone } = req.body;
            console.log(address)
            console.log(req.session.cart.items)
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                address: address,
                phone: phone

            })
            order.save().then(result => {
                req.flash('success', 'Order placed successfully')
                return res.redirect('/')
            }).catch(err => {
                console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')


            })


        }
    }
}
module.exports = orderController;