const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// serve uploaded files from /public
// serve uploaded files from server/public (uploads saved there)
app.use('/public', express.static(path.join(__dirname, '..', 'public')))

require('./routes')(app)

require('./userPassport')
require('./routes')(app)

const config = require('./config/config')

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
