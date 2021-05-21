const LocalStrategy = require('passport-local').Strategy;
const User = require('../../app/models/user')
const bcrypt = require('bcrypt')

function init(passport) {
    console.log("passport work")
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        //check if email exist
        //we get email and passport through login post
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'No user with this email' })
        }
        //compare enter pass with databae pass
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged in suu=cessfully' })
            }
            return done(null, false, { message: 'Wrong username and password' })
        }).catch(err => {
            //1)null ki jagah ager a=error ho to 
            //2) true ya false
            //3)message
            console.log(err)
            return done(null, false, { message: 'Something went wrong' })

        })

    }))
    //login hone ke bad session me kya store krna he
    passport.serializeUser((user, done) => {

        done(null, user._id)
    })
    //jo store kiya use get krna
    passport.deserializeUser(async (id, done) => {
        //we get id from serialize methode 
        //throw id we get user data
        User.findById(id, (err, user_data) => {
            done(err, user_data)
        })
    })
}
module.exports = init;