const router = require('express').Router()

const secrt = require('../models/secretere')
const doctor = require('../models/doctor')
const user = require ('../models/user')
const appointement =require('../models/appointement')

////////////////////////////////////////////////////////////////Register
router.post('/registerSec',(req,res)=>{
    var sec = new secrt({
      nom : req.body.nom,
      prenom : req.body.prenom,
      email : req.body.email,
      password : secrt.generateHash(req.body.password),
      numtel : req.body.numtel,
      id_doctor : null
    })
    sec.save((err , data)=>{
      if(err){console.log(err)}
      else{res.json(data)}
    })
})
 ////////////////////////////////////////////////////////////////login 
router.post('/loginSec',(req,res)=>{
    secrt.findOne({email : req.body.email},(err,results)=>{
        if (err){console.log(err)}
        else{
        if(!results){
            res.json('secretary introuvable !')
        }else{
            if (!results.validPassword(req.body.password)){
            res.json('Mot de passe incorrecte !')
            }
            else{
            res.json(results)
            }
        }
        }
    }).populate('id_doctor')
})

///////////////////////////////////////////////////////// Update Profile
router.post('/updateProfile/:id',(req,res)=>{
    console.log(req.params.id)
    secrt.findByIdAndUpdate({_id :req.params.id},{
      nom : req.body.nom,
      prenom : req.body.prenom,
      email : req.body.email,
      password : secrt.generateHash(req.body.password),
      numtel : req.body.numtel,
    },(err,results)=>{
      if(err) {
        console.log(err)
      }else{
        console.log(results)
        res.json(results)
      }
    })
  })
////////////////////////////////////////////////////////////////list Rv
router.get('/listRv/:id',(req,res)=>{
    appointement.find({id_doctor : req.params.id},(err,results)=>{
        if(err){console.log(err)}
        else{
            res.json(results)
        }
    }).populate('id_doctor').populate('id_patient')
})

////////////////////////////////////////////////////////////////accepter RV
router.post('/acceptRv/:id',(req,res)=>{
    appointement.findByIdAndUpdate({_id : req.params.id},{
        date : req.body.date,
        prix : req.body.prix,
        statue : true
    },(err)=>{
        res.json('Rendez vous accepté')
    })
})

////////////////////////////////////////////////////////////////cancel RV
router.get('/cancelRv/:id',(req,res)=>{
    appointement.findByIdAndUpdate({_id : req.params.id},{
        cancel : true
    },(err)=>{
        res.json('Rendez vous annulé')
    })
})


  

module.exports = router;