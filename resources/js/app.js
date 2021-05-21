console.log("javascript part work done ok");
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