const express = require('express')
const app = express()
const TreeNode = require('./TreeNode')
const axios = require('axios')
const fs = require('fs')
const cors = require('cors')

app.use(cors())

app.get('/api/tree', async(req, res) => {

    const quantityOfElements = req.query.quantity
    const numbersArray = makeArrayFromNumber(quantityOfElements)
    console.log(buildTree(numbersArray))
    res.json(await buildTree(numbersArray))
})

async function buildTree(numbersArray) {
    const flatArray = await makeFlatArray(numbersArray)
    let depth = 1
    let result = flatArray.find(item => item.depth === depth)
    function recursion(node, dep) {
        const nodes = flatArray.filter(item => item.depth === dep)
        if(nodes.length) {
            dep++
            node.children = nodes
            nodes.forEach(item => {
                recursion(item, dep)
            })
        } else return
    }
    recursion(result, depth)
    // fs.writeFileSync('./result.json', JSON.stringify(result))
    return JSON.stringify(result)
}

async function getValue() {
    const res = await axios.get('https://fish-text.ru/get?type=title&number=1&format=json')
    return res.data.text
}

async function makeFlatArray(numbers) {
    async function values(array) {
        const promises = array.map(async item => {
            return {
                value: await getValue(),
                children: [],
                depth: item
            }
        })
        return await Promise.all(promises)
    }
    return await values(numbers)
}

function makeArrayFromNumber(number) {
    let result = []
    for(let i = 0; i < number; i++) {
        result.push(i + 1)
    }
    return result
}

const port = 4251
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})