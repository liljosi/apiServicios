const express = require('express')
const knex = require('../knex')
const router = express.Router()

router.post('/usuarios',(req,res,next)=>{
    let data = {
        nombre : req.body.nombre,
        correo : req.body.correo
       
    }
    knex.select('nombre','correo').table('usuarios').where(data).then((response)=>{
        console.log(response)
        if(response[0].correo==data.correo){
            res.send('El correo ' +data.correo+ ' ya ha sido registrado')
        }else{
            knex('usuarios').insert({
                nombre : req.body.nombre,
                telefono : req.body.telefono,
                correo : req.body.correo,
                contraseña : req.body.contraseña,
                ciudad : req.body.ciudad,
                fecha_registro : req.body.fecha_registro,
                tipo : req.body.tipo
        
            }).then(function(data){
                res.send("Usuario registrado exitosamente!")
            })

        }
    })
   


})


router.get('/usuarios',(req,res,next)=>{
    knex.select().table('usuarios').then(users=>{
        res.json(users)
    })
})

router.post('/usuarios/auth',(req,res,next)=>{
   const data={
       correo:req.body.correo,
       contraseña:req.body.contraseña
   }

   const mensaje =[{Error:'Usuario no existe'}]
    /* SQL = 
    SELECT 
        *
    FROM 
        usuarios 
    WHERE 
        correo = "correo" AND 
        contra = "contraseña"
    */
  /* knex('usuarios').count('id as CNT').where(data).then(function(total) {
    res.send({
     
        total: total[0].CNT
      
    })
    
  })*/
  knex.select('tipo','nombre','id').table('usuarios').where(data).then(function(tipo){
      console.log(tipo)
      if(tipo[0]==null){
          res.send(mensaje)
      }else{
      res.send(tipo)
      }
  })
 
})

//router.get('/usuarios/auth',(req,res,next)=>{
  //  const data ={
      //  correo:req.body.correo,
       // contraseña:req.body.contraseña
   // }
  //  knex.select('tipo').table('usuarios').where(data).then(function(tipo){
       // res.send(tipo)
    //})
//})







module.exports = router