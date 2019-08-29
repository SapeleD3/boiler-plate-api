//imports
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//initializing app from express
const app = express();
const userRoute = require('./api/routes/user')
const feedRoute = require('./api/routes/feed')

//connecting to db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log('connected to MongoDD'))
.catch(err => console.log('could not connect to database'))

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//middleware to protect against cors error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
})

//Routes
app.get('/', (req, res) => {
    res.status(200).send('HELLO WORLD')
})

app.use('/user',  userRoute)
app.use('/feed', feedRoute)

//Error handlers
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status|| 500);
    res.json({
        error: { 
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 6536
app.listen(PORT, () => console.log(`server is Running on port ${PORT}`))

/** 
 * backend server using Node Express MongoDB and giving of response in json for any js framework used for view
 * to get registered users make a get request localhost:6530/user
 * to  create a user post to localhost:6530/user/register with the tags
        * "email":"test@test.com",
        * "password":"test" 
 * this would create the user test in the database
 * to get user from the database you send a post request to localhost:6530/user/login with tags
 *      "email":"test@test.com",
 *      "password":"test"
 * you would get an auth token that would be added to the HEADERS BEARER to access protected views
 * localhost:6530/feed
*/