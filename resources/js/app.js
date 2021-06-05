import initAdmin from './admin';
import moment from 'moment';
const cc = document.querySelector('.cartCounter')
import axios from 'axios';
import Noty from "noty";
const updateCart = (pizza) => {
    console.log("update cart work")
    console.log(pizza)
    axios.post('/update-cart', pizza).then((res) => {
        console.log("u")
        console.log(res.data)
        new Noty({
            type: 'success',
            layout: 'topCenter',
            theme: 'mint',
            timeout: 1000,
            text: "Order added in your Cart"
        }).show();
        cc.innerText = res.data.totalqty;


    }).catch((error) => {
        new Noty({
            type: 'warning',
            layout: 'topCenter',
            theme: 'mint',
            timeout: 1000,
            text: "Please try again!!!Something went wrong"
        }).show();
    })
}
const addToCart = document.querySelectorAll('.add-to-cart');
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
    })
})

// const orderPlaced = document.querySelectorAll('.orderPlaced')
// orderPlaced.addEventListener('click', () => {
//     console.log("work order places")
//     new Noty({
//         type: 'success',
//         layout: 'topCenter',
//         theme: 'mint',
//         timeout: 1000,
//         text: "Order placed succesfully"
//     }).show();
// })
const alertMsg=document.getElementById('#success_alert');
if(alertMsg){
    setTimeout(() => {
        console.log("setTime out ");
        alertMsg.remove();
    }, 20);
}
initAdmin();

//change order status
let statuses = document.querySelectorAll('.status_line');  //select all li
let hiddenInput=document.querySelector('#hiddenInput');
let order=hiddenInput ? hiddenInput.value : null;
order=JSON.parse(order);
console.log(order.status);
let time = document.createElement('small'); //creating small tag in html
function updateStatus(order){
    console.log("function work")
   let stepCompleted=true;
   statuses.forEach((status)=>{
       let dataProp=status.dataset.status;
       console.log(dataProp);
       if(stepCompleted){
        status.classList.add('step-completed');
       }
       console.log(dataProp);
       console.log(order.status);
       if(dataProp===order.status){
          
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            status.appendChild(time);
            if(status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
               }
       }    //dataProp='confirmed prepared'
   })

}
updateStatus(order);