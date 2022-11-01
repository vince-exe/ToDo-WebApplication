const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const serverConfigs = require('./configs/configs.json')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, resp) => {
    resp.redirect('http://localhost:3000/views/login.html')
})

app.all('*', (req, resp) => {
    resp.redirect('http://localhost:3000/views/404.html')
})

app.listen(serverConfigs.ServerPort, () => {
    console.log(`Server is listening on port ${serverConfigs.ServerPort}`)
})
