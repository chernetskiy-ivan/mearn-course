const express = require('express')
const config = require('config')

const app = express() //наш будущий сервер

const PORT = config.get('port') || 5000

app.listen(PORT, () => console.log(`App has been started on port:${PORT}...`))
