const User = require('../../models/user')
const b = require('bcrypt');
const passport = require('passport');


function authController() {
    const _getUrl=(req)=>{
    return req.user.role==='admin'?'/admin/orders':'/customer/order';
    }
    return {
        //login:(){ }
        login(req, res) {
            res.render('auth/login');

        },

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, msg) => {
                if (err) {
                    req.flash('error', msg.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', msg.message)
                    return res.redirect('/login')
                }
                //log in user and store data in req.user
                req.logIn(user, (err) => {
                    if (err) {

                        req.flash('error', msg.message)
                        return next(err)

                    }

                    return res.redirect(_getUrl(req))
                })
            })(req, res, next)

        },
        register(req, res) {
            res.render('auth/register');

        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            const hashPassword = await b.hash(password, 10)
            console.log(req.body);
            const user = new User({
                name: name,
                email: email,
                password: hashPassword
            })
            user.save().then((r) => { return res.redirect('/') }).catch((e) => {
                console.log(e);
                req.flash('error', 'something went wrong please try again')
                return res.redirect('/resgister');

            })
        },
        logout(req, res) {
            console.log("logout work")
            //logout methode are provided by passport

            req.logout();
            req.session.destroy();
            return res.redirect('/login')
        }
    }
}
module.exports = authController;