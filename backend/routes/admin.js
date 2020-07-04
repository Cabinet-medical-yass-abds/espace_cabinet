const router = require('express').Router();
const doctor = require('../models/doctor');
const secretere = require('../models/secretere');
const patient = require('../models/patient')
const user = require('../models/user');

// Doctors crud
router.get('/listAll', (req, res) => {
  doctor.find({}, (err, results) => {
    if (err) { console.log(err) } else {
      res.json(results)
    }
  })
})


router.post('/addOne', (req, res) => {
  var doc = new doctor({
    nom : req.body.nom,
    prenom : req.body.prenom,
    email : req.body.email,
    password : user.generateHash(req.body.password),
    adress : {
      city : req.body.city,
      street : req.body.street,
      zip : req.body.zip
    },
    numtel : req.body.numtel,
    man  : req.body.man ,
    spec : req.body.spec,
    bio : req.body.bio,
    id_secrt : '' 
  })
  doc.save((err)=>{
    if(err){console.log(err)}
    else{res.status(200).json('doctor added')}
  })
})


router.post('/update/:id', (req, res, next) => {
  let userr = req.body.id_user;
  delete req.body.id_user;
  req.body.id_user = userr._id;
  let doc = req.body;
  console.log('user :', userr);
  doctor.updateOne({ id_user: userr._id }, { $set: doc }, function(err) {
    if (err) {
      console.log(err)
      res.json('error');
    } else {
      console.log('my req body:', doc);
      user.updateOne({ _id: userr._id }, { $set: userr }, function(err) {
          if (err) {
              console.log(err);
              res.json('error');
          } else {
              res.json('Doctor updated !!,user updated');
          }
      })
    }
  });
});

router.get('/delete/:id', (req, res,) => {
  doctor.findByIdAndDelete({_id : req.params.id},(err)=>{
    if (err) {

    }else{
      res.status(200).json('Doctor removed !!')
    }
  })
})
// End Doctors crud

// Secretary crud
router.get('/listAllSecretaries', (req, res) => {
  secretere.find({}, (err, results) => {
    if (err) { console.log(err) } else {
      res.json(results)
    }
  }).populate('id_user');
})

router.post('/addOneSecretary', (req, res) => {
  req.body.nom = req.body.name,
  req.body.email = req.body.email 
  req.body.password = user.generateHash(req.body.password);;
  req.body.role = {
    isSecretary : true
  };
  let userr = new user(req.body);
  console.log(userr)
  userr.save((err,user) => {
    req.body.id_user = user._id;
    let sec = new secretere(req.body)
    sec.save((err) => {
      if (err) {
          console.log(err)
          res.json('erreur')
      } else {
          res.json('doctor added !!')
      }
    })
  });
})

router.get('/deleteSec/:id', (req, res,next) => {
  secretere.deleteOne({ id_user: req.params.id }, (err) => {
    if (err)
        console.log(err);
    else {
      user.deleteOne({ _id: req.params.id }, (err,user) => {
        console.log(user);
        res.json('secretere removed !! user removed');
      })
    }    
  })
})


router.post('/updateSec/:id', (req, res, next) => {
  let userr = req.body.id_user;
  console.log('user :', userr);
  user.updateOne({ _id: userr._id }, { $set: userr }, function(err) {
    if (err) {
        console.log(err);
        res.json('error');
    } else {
        res.json('Secretarry updated !!,user updated');
    }
  })
});


module.exports = router;