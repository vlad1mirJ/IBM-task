const http = require("http")

const hostname = "127.0.0.1"
const port = 5000

const server = http.createServer((request, response) => {
  if (request.method === "POST" && request.url === "/click") {
    let data = ""
    request
      .on("data", chunk => {
        data += chunk
      })
      .on("end", () => {
        const { companyName, dateFrom, dateTo } = JSON.parse(data)
        console.log(`User clicked on ${companyName}`)
        console.log(`Stock data is shown from ${dateFrom} to ${dateTo}`)
        response.statusCode = 200
        response.setHeader("Content-Type", "application/json")
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.end(JSON.stringify(data))
      })
  } else {
    response.statusCode = 404
    response.end()
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${5000}/`)
})
