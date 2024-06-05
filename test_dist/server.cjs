const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
	let filePath = ''

	let isIndex = false
	if (req.url === '/') {
		isIndex = true
		filePath = './index_esm.html'
	} else if (req.url.startsWith('/dist') || req.url === '/demo_content.js') {
		filePath = '..' + req.url
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404)
			res.end(`File ${filePath} not found!`)
			return
		}

		let contentType = ''
		if (path.extname(filePath) === '.html') contentType = 'text/html'
		if (path.extname(filePath) === '.css') contentType = 'text/css'
		if (path.extname(filePath) === '.js') contentType = 'application/javascript'

		res.writeHead(200, { 'Content-Type': contentType })

		res.end(data)
	})
})

const PORT = 3000
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
