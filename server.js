const express = require('express')
const app = express()
 
app.use('/', express.static('public'))

app.get('/ingredients', function (req, res) {
  
}) 

app.listen(3000)