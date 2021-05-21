const Menu = require('../../models/menu');
function homeController() {
    return {
        async index(req, res) {
            // Menu.find().then((pizzas) => console.log(pizzas));
            // res.render('home', { pizzas: pizzas });
            try {
                const pizzas = await Menu.find();
                // console.log(pizzas);
                res.render('home', { pizzas: pizzas });
            } catch (error) {
                res.send({ status: "catch block" });
            }
        }
    }
}
module.exports = homeController;