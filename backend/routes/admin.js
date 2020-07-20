const router = require('express').Router();
const doctor = require('../models/doctor');
const secretere = require('../models/secretere');
const user = require('../models/user');
const claim = require('../models/claim')
const appointement = require('../models/appointement')

//////////////////////////////////////////////////////////// Doctors crud
router.get('/listAll', (req, res) => {
  doctor.find({}, (err, results) => {
    if (err) { console.log(err) } else {
      console.log(results)
      res.json(results)
    }
  }).populate('id_secrt')
})

router.get('/acceptDoctor/:id', (req, res,) => {
  doctor.findByIdAndUpdate({_id : req.params.id},{accepted : true},(err)=>{
    if (err) {
      console.log(err)
    }else{
    res.json('doctor removed !!')
    }
  })
})

router.get('/delete/:id', (req, res,) => {
  doctor.findByIdAndDelete({_id : req.params.id},(err,data)=>{
    if (err) {
      console.log(err)
    }else{
      if (data.id_secrt != null) {
        secretere.findByIdAndUpdate({_id : data.id_secrt._id},{id_doctor : null},(err)=>{
          res.json('doctor removed !!')
        })
      }else{
        res.json('doctor removed !!')
      }     
    }
  }).populate('id_secrt')
})
// End Doctors crud


////////////////////////////////////////////////////////// Secretary crud
router.get('/listAllSecretaries', (req, res) => {
  secretere.find({}, (err, results) => {
    if (err) { console.log(err) } 
    else {
      res.json(results)
    }
  }).populate('id_doctor');
})


router.get('/deleteSec/:id', (req, res,next) => {
  secretere.findByIdAndDelete({_id : req.params.id},(err,data)=>{
    if (err) {
      console.log(err)
    }else{
      console.log('dataaaaa:',data);
      if (data.id_doctor != null) {
        doctor.findByIdAndUpdate({_id : data.id_doctor._id},{id_secrt : null},(err)=>{
          res.json('secrt removed !!')
        })
      }else{
        res.json('secrt removed !!')
      }
    }
  }).populate('id_doctor')
})

/////////////////////////////////////////////////////////////patient crud
router.get('/listpatient',(req,res)=>{
    user.find({},(err,results)=>{
      if (err) {
        console.log(err)
      }else{
        res.json(results)
      }
    })
})

//////////////////////////////////////////////////////////// Reclamations crud
router.get('/listclaim',(req,res)=>{
  claim.find({},(err,results)=>{
    if (err) {
      console.log(err)
    }else{
      res.json(results)
    }
  }).populate('id_patient')
})

router.post('/answerclaim/:id',(req,res)=>{
  claim.findByIdAndUpdate({_id : req.params.id},{answer : req.body.answer},(err)=>{
    if (err) {
      console.log(err)
    }else{
      res.json('claim answered !!')
    }
  })
})

router.get('/deleteclaim/:id', (req, res,next) => {
  claim.findByIdAndDelete({_id : req.params.id},(err)=>{
    if (err) {
      console.log(err)
    }else{
      res.json('claim deleted !!')
    }
  })
})

//////////////////////////////////////////////////////////// Read all appointement
router.get('/getAllRv',(req,res)=>{
  appointement.find({},(err,results)=>{
    res.json(results)
  })
})

///////////////////check email exists
router.post('/existEmail',async(req,res)=>{
  var dispo = {
    patient : false,
    doc : false ,
    secretary : false
  }
  try{
    var checkuser = await user.findOne({email : req.body.email})
    var checkdoc = await doctor.findOne({email : req.body.email})
    var checksec = await secretere.findOne({email : req.body.email})
    
    if(checkuser){
      dispo.patient = true
    }
    if(checkdoc){
      dispo.doc = true
    }
    if(checksec){
      dispo.secretary = true
    }

    res.json(dispo)
}catch(ex){
    console.log('error',ex)
}
})

module.exports = router;




