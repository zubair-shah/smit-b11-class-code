const { readFileSync, writeFileSync } = require('fs')
console.log("started reading file")
const readFirstFile = readFileSync('./content/firstFile.txt', 'utf8')

writeFileSync('./content/result.txt',
    `Here is the result : ${readFirstFile}`
)

console.log(readFirstFile)
console.log("done with task")