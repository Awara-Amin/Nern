
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');




module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //     Counter.find()
    //         .exec()
    //         .then((counter) => res.json(counter))
    //         .catch((err) => next(err));
    // });

    // app.post('/api/counters', function (req, res, next) {
    //     const counter = new Counter();

    //     counter.save()
    //         .then(() => res.json(counter))
    //         .catch((err) => next(err));
    // });

    // the  first thing we do is the SIGN uP 
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            password } = body;
        let { email } = body;

        if (!firstName) {
            // console.log('err 3:', err);
            return res.send({
                success: false,
                message: 'Error: the first name cannot be blank'
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: the last name cannot be blank'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: the email cannot be blank'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: the password cannot be blank'
            });
        }

        console.log('here')


        // it sets email to lower case
        email = email.toLowerCase();

        // veryfiy email doesnt exist
        // then save
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Servor error'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exist.'
                });
            }

            // agar na Done sign up xalas, save the new object 
            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Servor error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                });
            });

        });

    });

    app.post('/api/account/signin', (req, res, next) => {
        const {body} = req;
        console.log('body', body)
        const {
            password
        } = body;
        let {
            email
        } = body;


        if (!email) {
            return res.send({
                success: false,
                message: 'Error: the email cannot be blank'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: the password cannot be blank'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if(err){
                console.log('err 2:', err);
                return res.send({
                    success: false, 
                    message: 'Error: server error'
                });
            }
            if(users.length !=1){ 
                return res.send({
                    success: false, 
                    message: 'Error: Invalid'
                });
            }



            const user = users[0];
            if(!user.validPassword(password)){
                return res.send({
                    success: false, 
                    message: 'Error: Invalid'
                });
            }

            // Otherwise kaka user it should be correct and create a user session
            const userSession =  new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => { 
                if (err){ 
                    console.log(err);
                    return res.send({
                        success: false, 
                        message: 'Error: server error'
                    });
                }
                return res.send({
                    success: true, 
                    message: 'Valid sign in',
                    token: doc._id
                });
            });
        });

    });

    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
        const { query} = req;
        const { token} = query;
        //  ?token=test

        //  verify the token is one of a kind and
        UserSession.find({ 
            _id: token,
            isDeleted: false
        }, (err, sessions) => { 
            if(err){
                console.log('err 3:', err);
                return res.send({
                    success: false, 
                    message: 'Error: Server error'
                });
            }

            if (sessions.length != 1){ 
                console.log('err 4:', err);
                return res.send({
                    success: false,
                    message:'Erroe: Invalid'
            });
            } else { 
                return res.send({
                    success: true, 
                    message: 'Good'
                });
            }
        });
    });

    app.get('/api/account/logout', (req, res, next) => {

        const { query} = req;
        const { token} = query;
        //  ?token=test

        //  verify the token is one of a kind and
        UserSession.findOneAndUpdate({ 
            _id: token,
            isDeleted: false
        }, {
            $set:{
                isDeleted:true
            }
        }, null, (err, sessions) => { 
            if(err){
                console.log('err 3:', err);
                return res.send({
                    success: false, 
                    message: 'Error: Server error'
                });
            }
            return res.send({
                    success: true, 
                    message: 'Good'
                });
        });
    });

};