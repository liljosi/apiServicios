const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended :true
}));

const usersRoute = require('./routes/usuarios')
const servicesRoute = require('./routes/servicios')
const cotizacionRoute = require('./routes/cotizaciones')
const metasRoute = require('./routes/metas')

app.use('/api',usersRoute)
app.use('/api',servicesRoute)
app.use('/api',cotizacionRoute)
app.use('/api',metasRoute)

app.get('/',(req,res,next)=>{
    res.send('Welcome to node')
})



app.listen('3000',()=>{
    console.log('node running on port 3000')
})

module.exports = {
    app: app,
    server: server
  };
