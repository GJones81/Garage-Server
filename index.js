// Require needed packages
require('dotenv').config()
let express = require('express')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')
let cors = require('cors')
let expressJwt = require('express-jwt')
// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)
app.use(cors())//cors middleware for securing the app routes to logged in users


// Routes
app.use('/auth', require('./controllers/auth'))
app.use('/profile', expressJwt({secret: process.env.JWT_SECRET}), require('./controllers/profile'))

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
})
