const Order = require('../../models/order');
const moment=require('moment')
function orderController() {
    return {
        store(req, res) {
            const { address, phone } = req.body;
            // console.log(address)
            // console.log(req.session.cart.items)
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                address: address,
                phone: phone

            })
            order.save().then(result => {

                req.flash('success', 'Order placed successfully')

                // req.session.destroy();
                // console.log(req.session.cart)
                delete req.session.cart;
                return res.redirect('/customer/order')
            }).catch(err => {
                // console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')


            })
        },
        async index(req,res){
            // console.log("in order table display page")
            // console.log("user data")
            // console.log(req.user)
            const order=await Order.find({customerId:req.user._id},null,{sort:{'createdAt':-1}})
            // console.log(order)
            res.render('customers/order',{orders:order,moment:moment})
        },
        async tracker(req,res){
            // console.log(req.params.id);
            const order=await Order.findOne({_id:req.params.id});
            // console.log(order);
            if(req.params.id.toString() === order._id.toString()){
            return res.render('customers/tracker',{order});
          }else{
              return res.redirect('/');
          }
        }
    }
}
module.exports = orderController;