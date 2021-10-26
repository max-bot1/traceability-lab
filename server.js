const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken:'a6b51178cb2a4f8a86bac4f052a95158',
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


app.post('/api/colors', (req, res) => {
    let color = req.body

    const index = colors.findIndex(colorName => colorName === color)


    if(index === -1 && color !== ''){
        colors.push(color)
        rollbar.log('Color added successfully', {author: 'Max', type: 'manual entry'})
        res.status(200).send(colors)
       } else if (color === '') {
           rollbar.error('No color given')
           res.status(400).send('Must provide a color')
       } else {
           rollbar.critical('Color already exists ')
           res.status(400).send('Color already exists')
       }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Activity detected in sector ${port}`))