const express = require('express')
const knex = require('../knex')
const router = express.Router()

router.get('/servicios',(req,res,next)=>{
    knex.select('nombre_servicio').table('servicios').then(servicios=>{
        res.json(servicios)
    })
})

router.get('/servicios/clientes',(req,res,next)=>{
    knex.select('nombre_servicio','imagen','descripcion').table('servicios').then(servicios=>{
        res.json(servicios)
        console.log(servicios)
    })
})


module.exports = router