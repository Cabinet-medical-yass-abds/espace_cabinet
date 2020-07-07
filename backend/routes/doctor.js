const router = require('express').Router();
const doctor = require('../models/doctor');
const secretere = require('../models/secretere');
const user = require('../models/user');
const message = require('../models/message')
const consult = require('../models/consultation')

const upload = require('../config/multer_cofig');
const consultation = require('../models/consultation');

///////////////////////////////////////////////////////// Register Doctor
router.post('/registerDoctor',(req,res)=>{
  var doc = new doctor({
    nom : req.body.nom,
    prenom : req.body.prenom,
    email : req.body.email,
    password : doctor.generateHash(req.body.password),
    adress : {
      city : req.body.city,
      street : req.body.street,
      zip : req.body.zip
    },
    numtel : req.body.numtel,
    man  : req.body.man,
    spec : req.body.spec,
    bio : req.body.bio,
    id_secrt : null 
  })
  doc.save((err,data)=>{
    if(err){console.log(err)}
    else{res.json(data)}
  })
})
///////////////////////////////////////////////////////// Update Profile
router.post('/updateProfile/:id',(req,res)=>{
  doctor.findByIdAndUpdate({_id :req.params.id},{
    nom : req.body.nom,
    prenom : req.body.prenom,
    email : req.body.email,
    password : doctor.generateHash(req.body.password),
    adress : {
      city : req.body.city,
      street : req.body.street,
      zip : req.body.zip
    },
    numtel : req.body.numtel,
    man  : req.body.man,
    spec : req.body.spec,
    bio : req.body.bio,
  },(err,results)=>{
    if(err) {
      console.log(err)
    }else{
      res.json(results)
    }
  })
})
///////////////////////////////////////////////////////// Login Doctor
router.post('/loginDoctor',(req,res)=>{
  doctor.findOne({email : req.body.email},(err,results)=>{
    if (err){console.log(err)}
    else{
      if(!results){
        res.json('Docteur introuvable !')
      }else{
        if (!results.validPassword(req.body.password)){
          res.json('Mot de passe incorrecte !')
        }
        else{
          res.json(results)
        }
      }
    }
  }).populate('id_secrt')
})

router.get('/getDoc/:id',(req,res)=>{
  doctor.findById({_id : req.params.id},(err,results)=>{
    if (err){console.log(err)}
    else{
      res.json(results)
    }
  }).populate('id_secrt');
})




/////////////////////////////////Messsages
router.get('/listMsg/:id',(req,res)=>{
  message.find({id_doctor : req.params.id},(err,results)=>{
    if(err){console.log(err)}
    else{
      res.json(results)
    }
  }).populate('id_patient')
})

router.post('/answerMsg/:id',(req,res)=>{
  message.findByIdAndUpdate({_id : req.params.id},{
      $push : {conversation : {
        msg : req.body.msg,
        fromPatient : false
      }}
  },(err,data)=>{
    res.json('message envoyé')
  })
})


/////////////////////////////////////list Secret
router.get('/listSec',(req,res)=>{
  secretere.find({id_doctor : null},(err,results)=>{
    if(err){console.log(err)}
    else{
      res.json(results)
    }
  })
})

router.get('/hireSec/:id_sec/:id_doc',(req,res)=>{
  doctor.findByIdAndUpdate({_id : req.params.id_doc},{id_secrt : req.params.id_sec},(err,results)=>{
    if(err){console.log(err)}
    else{
      secretere.findByIdAndUpdate({_id  :  req.params.id_sec},{id_doctor : results.id},(err,data)=>{
        res.json('secretaire ajoutée')
      })
    }
  })
})

router.get('/unhire/:id_sec/:id_doc',(req,res)=>{
  doctor.findByIdAndUpdate({_id : req.params.id_doc},{id_secrt : null},(err,results)=>{
    if(err){console.log(err)}
    else{
      secretere.findByIdAndUpdate({_id  :  req.params.id_sec},{id_doctor : null},(err,data)=>{
        res.json('secretaire unhired')
      })
    }
  })
})

////////////////////////////////////Consultations
router.get('/listConsult/:id',(req,res)=>{
  consult.find({id_doctor : req.params.id},(err,results)=>{
    res.json(results)
  }).populate('id_patient').populate('id_appointment')
})

router.get('/updateConsul/:id_doc/:id_cons',upload.single('myfile'),(req,res)=>{
  consultation.findByIdAndUpdate({_id : req.prams.id_cons},{
    $push : { files : req.file.filename}
  },(err,results)=>{
      res.json('File added !')
  })
})

router.get('/deleteConsult/:id',(req,res)=>{
  consultation.findByIdAndDelete({id_doctor : req.params.id},(err)=>{
    res.json('consultaion supprimée !')
  })
})

module.exports = router;


