const express = require ('express')
const knex = require('../knex')
const router = express.Router()

router.post('/metas',(req,res,next)=>{
    let save={}
    const data ={
        nombre:req.body.nombre,
        
    }
    knex.select('nombre').table('metas').where(data).then(function(response){
        console.log(response)
        if(response[0]==null){
            knex('metas').insert({
                nombre:req.body.nombre,
                meta_mensual:req.body.meta_mensual
            }).then(function(){res.send('meta guardada')})
           }else if(response[0].nombre==req.body.nombre){
               
               knex('metas').update({meta_mensual:req.body.meta_mensual}).where(data).then(function(){
                res.send('meta actualizada')
            })
           }
    })
    
})

router.post('/metas/obtener',(req,res,next)=>{
    data={
        nombre:req.body.nombre
    }
    knex.select('meta_mensual').table('metas').where(data).then((response)=>{
     
        res.json(response)
    })
})


module.exports = router