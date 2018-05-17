const express = require ('express')
const knex = require('../knex')
const router = express.Router()

router.post('/cotizaciones',(req,res,next)=>{
knex('cotizaciones').insert({
    nombre: req.body.nombre,
    domicilio: req.body.domicilio,
    telefono: req.body.telefono,
    correo: req.body.correo,
    servicios:req.body.servicios,
    id_usuario:req.body.id_usuario
}).then(function(){
    res.send('La cotización ha sido enviada! ')
})
})

router.get('/cotizaciones',(req,res,next)=>{
    knex.select().table('cotizaciones').then((response)=>{
        res.json(response)
    })
})

router.post('/cotizaciones/concluidas',(req,res,next)=>{
    const concluida = {
       
        estado:'concluida',
        id_usuario: req.body.id_usuario
    }
    knex.select().table('cotizaciones').where(concluida).then((response)=>{
        res.json(response)
    })
})

router.post('/cotizaciones/noconcluidas',(req,res,next)=>{
    const data1 ={
        estado:'en proceso',
        id_usuario:req.body.id_usuario
    }
    const data2 ={
        estado:'enviada',
        id_usuario:req.body.id_usuario
    }
    const data3 ={
        estado:'recibida',
        id_usuario:req.body.id_usuario
    }
   
  
    
    knex.select().table('cotizaciones').where(data1).orWhere(data2).orWhere(data3).then((response)=>{
        res.json(response)
    })
})



module.exports=router