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
  console.log('my body:',req.body);
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
      doctor.findById({_id : results.id},(err,data)=>{
        res.json(data)
      }).populate('id_secrt')
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

/////////////////////////////////////// list payments
router.post('/listPayment/:id',(req,res)=>{
  consultation.find({id_doctor : req.params.id , createdAt : { $gte: req.body.dateD, $lte: req.body.dateF }},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.json(data)
    }
  }).populate('id_appointment').populate('id_patient')
})


/////////////////////////////////Messsages
router.get('/listMsg/:id',(req,res)=>{
  message.find({id_doctor : req.params.id},(err,results)=>{
    if(err){console.log(err)}
    else{
      res.json(results)
    }
  }).populate('id_patient').populate('id_doctor')
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
// archived means consultation is done 
// Get current consultations where archived is false 
router.get('/listConsult/:id',(req,res)=>{
  consult.find({id_doctor : req.params.id,archived : false},(err,results)=>{
    res.json(results)
  }).populate('id_patient').populate('id_appointment')
})

// Get current consultations where archived is true
router.get('/listConsultArchived/:id',(req,res)=>{
  consult.find({id_doctor : req.params.id,archived : true},(err,results)=>{
    res.json(results)
  }).populate('id_patient').populate('id_appointment')
})

// Archive consultation
router.get('/archiveConsult/:id_cons',(req,res)=>{
  console.log('req.params.id_cons:',req.params.id_cons);
  consultation.findByIdAndUpdate({_id : req.params.id_cons},{ archived : true}
    ,(err,results)=>{
      res.json('consultation archived !');
  })
})

router.post('/updateConsul/:id_cons',upload.single('file'),(req,res)=>{
  var myFileName = res.req.file.filename;
  consultation.findByIdAndUpdate({_id : req.params.id_cons},{
    $push : { 
      files : 
      {
        file : myFileName}
      }
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


