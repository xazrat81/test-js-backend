const express = require('express'), 
      app = express(),
      cors = require('cors')
const fs = require('fs')
const { buildTree, makeArrayFromNumber } = require('./methods')

app.use(cors())

app.get('/api/tree', async(req, res) => {

    const quantityOfElements = req.query.quantity
    const numbersArray = makeArrayFromNumber(quantityOfElements)
    res.json(await buildTree(numbersArray))

})


const port = 4251
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})