const TreeNode = require('./TreeNode')
const axios = require('axios')

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
          const value = await getValue()
          return new TreeNode(value, item)
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

module.exports = {
  buildTree,
  makeArrayFromNumber
}