
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/cartController')
const orderController = require('../app/http/controllers/orderController')

function initRoutes(app) {
    app.get("/", homeController().index);

    //auth route
    app.get("/login", authController().login
    );
    app.post("/login", authController().postLogin
    );
    app.get("/register", authController().register
    );
    app.post("/register", authController().postRegister
    );
    app.post("/logout", authController().logout
    );

    //offer route
    app.get("/offers", cartController().offer)

    app.get("/cart", cartController().index)

    app.post("/update-cart", cartController().update)

    //cart order ontroller
    app.post("/order", orderController().store)

}
module.exports = initRoutes;