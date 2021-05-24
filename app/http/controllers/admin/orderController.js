const Order=require('../../../models/order')
function orderController(){
    return {
        async index(req,res){
        //   const data=await Order.find({status:{$ne:'completed'}},null,{sort:{'createdAt':-1}})
        //   .populate('customerId','-password').exac((err,orders)=>{
              
              
        //   })
          res.send("hello")
        }
    }
}
module.exports=orderController