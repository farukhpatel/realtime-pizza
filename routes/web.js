
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/cartController')
const orderController = require('../app/http/controllers/orderController')
//midddleware
const guest= require('../app/http/middleware/guest'); //for login and register
const auth= require('../app/http/middleware/auth');
const admin= require('../app/http/middleware/admin');


const orderControllerAdmin = require('../app/http/controllers/admin/orderController')
const statusController=require('../app/http/controllers/admin/statusController');
function initRoutes(app) {
    app.get("/", homeController().index);

    //auth route
    app.get("/login",guest, authController().login
    );
    app.post("/login", guest,authController().postLogin
    );
    app.get("/register", guest,authController().register
    );
    app.post("/register", authController().postRegister
    );
    app.post("/logout", authController().logout
    );

    //offer route
    app.get("/offers", cartController().offer)

    app.get("/cart", cartController().index)

    app.post("/update-cart", cartController().update)

    //cart order ontroller  //customer routes as wel
    app.post("/order", auth,orderController().store)
    app.get("/customer/order",auth,orderController().index)

    //admin routes
    app.get("/admin/orders",admin,orderControllerAdmin().index)
    app.post("/admin/order/status",admin,statusController().index);
}
module.exports = initRoutes;