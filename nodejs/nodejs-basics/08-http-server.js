const http = require('http')
const { readFileSync } = require('fs')

const homePage = readFileSync('./content/index.html')

const server = http.createServer((req, res) => {
    let url = req.url;
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(homePage)
        res.end()
    } else if (url === '/about') {
        res.end("<h1> Yes this is About Page</h1>")
    } else {
        res.end("Sorry Can't find")
    }
    console.log("req", req)
})

server.listen(5000, () => {
    console.log("Server is running on port:5000")
})