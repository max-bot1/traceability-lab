const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken:'4ad1c9653e7444c5b651c9c3bf44d6ab',
    captureUncaught: true,
    captureUncaught: true
})
rollbar.log("Hello world!")

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let colors = []
// function addColor (color){
//     colors.push(color)
// }

app.post('/api/colors', (req, res) => {
    let color = req.body
    color = color.trim()

    addColor(color)

    rollbar.log('color successfully added')
    
    res.status(200).send(colors)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Activity detected in sector ${port}`))