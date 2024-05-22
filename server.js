const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')


app.use(cors({
    credentials: true,
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());



const carsRoute = require('./routes/carsRoute'); // CommonJS syntax for requiring modules
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use('/api/cars/', carsRoute)
app.use('/api/users/', usersRoute)
app.use('/api/bookings/', bookingsRoute)


// const path = require('path')

// if (process.env.NODE_ENV === 'production') {
//     app.use('/' , express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }



app.get('/', (req, res) => res.send('Hello World!'))


 


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))