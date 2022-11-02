const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const serverConfigs = require('./configs/configs.json')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('public'))

/* routers */
app.use('/login', require('./routers/loginRouter'))
app.use('/registration', require('./routers/registrationRouter'))

app.get('/', (req, resp) => {
    resp.redirect('http://localhost:3000/views/login')
})

/*
app.all('*', (req, resp) => {
    resp.redirect('http://localhost:3000/views/404.html')
})
*/

mongoose.connect('mongodb://localhost:27017/firstDatabase')
.then(resp => {
    console.log('Database open on port 27017')

    app.listen(serverConfigs.ServerPort, () => {
        console.log(`Server is listening on port ${serverConfigs.ServerPort}`)
    })
})
.catch(error => {
    console.error(error)
})
