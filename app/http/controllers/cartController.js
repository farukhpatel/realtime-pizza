const Menu = require('../../models/menu');
function homeController() {
    return {
        index(req, res) {
            res.render('customers/cart');
        },
        offer(req, res) {
            res.render('customers/offer');
        },

        update(req, res) {
            console.log("update cart process to send response")

            //logic part storing in databas items

            if (!req.session.cart) { //blueprint for session in cart
                req.session.cart = {
                    items: {},
                    totalPrice: 0,
                    totalQty: 0
                }
            }
            //if cart does not exist
            let cart = req.session.cart;
            // console.log("depug")
            console.log(req.body)
            // console.log(cart.items[req.body._id])
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price;

            }
            else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }


            console.log(req.session.cart)
            return res.json({ totalqty: req.session.cart.totalQty })


        }




    }
}
module.exports = homeController;