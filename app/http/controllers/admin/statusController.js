const Order=require('../../../models/order');
function statusController(){
    return {
        async index(req,res){
           console.log("upadte process");
           console.log(req.body);
            // Order.updateOne({id:req.body.orderId},{status:req.body.status},(err,data)=>{
            //     if(err){
            //         console.log(err);
            //         res.redirect('/admin/orders')
            //     }
            //     return res.redirect('/admin/orders')

            // })
        //    const result=await Order.updateOne({id:req.body.orderId},{status:req.body.status});
        //    console.log(result)
        //    return res.redirect('/admin/orders')


        Order.updateOne({_id:req.body.orderId}, 
            {status:req.body.status}, function (err, docs) {
            if (err){
                console.log(err)
                return res.redirect('/admin/orders');
            }
            else{
                console.log("Updated Docs : ", docs);
                return res.redirect('/admin/orders');
            }
        });
           
       }
    }
}
module.exports=statusController;