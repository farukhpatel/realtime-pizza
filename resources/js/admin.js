const { default: axios } = require("axios");
const moment=require('moment')
function initAdmin(){
    const orderTabeBody=document.querySelector("#orderTabeBody");
    let orders=[];
    let markup;

    axios.get('/admin/orders',{
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res=>{
        console.log(res.data);
        orders=res.data;
        markup=generateMarkup(orders);
        orderTabeBody.innerHTML=markup;
    }).catch(err=>{
        console.log(err);
    })
    function renderItems(items){
          let parsedItems=Object.values(items);
          return parsedItems.map((item)=>{
              return `
                 <p> ${item.item.name} - ${item.item.price} </p>
              `;
          }).join('');
    }
    function generateMarkup(orders){
      return orders.map(order=>{
          return `
          <tr>
             <td class="border px-4 py-2 text-green-900">
             <p>${order._id}</p>
             <p>Customer Name:-${order.customerId.name}</p>
             <div>${renderItems(order.items)}</div>
             </td>
             <td class="border px-4 py-2 text-green-900">
             ${order.address} 
             </td>
             <td class="border px-4 py-2 text-green-900">
             ${order.status}
             </td>
             <td class="border px-4 py-2 ">
             <div class="inline-block relative w-64">
               <form action="/admin/order/status" method="POST">
               <input type="hidden" name="orderId" value="${order._id}">
               <select  name="status" onChange="this.form.submit()"
               class="block appearance-none w-full bg-white border
               border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded
               shadow leading-tight focus:outline-none focus:shadow-outline">
               <option value="order_placed"
               ${order.status}==='order_placed'?'selected':''}>
               Placed</option>

               <option value="confirmed"
               ${order.status}==='confirmed'?'selected':''}>
               Confirmed</option>

               <option value="prepared"
               ${order.status}==='prepared'?'selected':''}>
               Prepared</option>

               <option value="delivered"
               ${order.status}==='delivered'?'selected':''}>
               Delivered</option>

               <option value="completed"
               ${order.status}==='completed'?'selected':''}>
               Completed</option>
               </select>

               </form>
                 </div>
             </td>
             <td class="border px-4 py-2">
             ${moment(order.createdAt).format('hh:mm A')}
             </td>
          </tr>
          `;
      }).join('');  //join one array data and then second then and then
    }
}
module.exports=initAdmin;