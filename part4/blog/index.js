const app = require('./app')
const http = require('http')
const config = require('./utils/conf')

const server = http.createServer(app)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})