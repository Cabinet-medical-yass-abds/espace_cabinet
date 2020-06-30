const router = require('express').Router();
const doctor = require('../models/doctor');
const secretere = require('../models/secretere');
const user = require('../models/user');

// Doctors crud
router.get('/listAll', (req, res) => {
  doctor.find({}, (err, results) => {
    if (err) { console.log(err) } else {
      res.json(results)
    }
  }).populate('id_user');
})


router.post('/addOne', (req, res) => {
  req.body.man = req.body.sexe;
  req.body.adress = {
    city : req.body.city,
    street : req.body.street,
    zip : req.body.zip
  }
  req.body.nom =  req.body.name;
  req.body.prenom =  req.body.fname;
  req.body.role = {
    isDoctor : true
  };
  req.body.id_secrt = req.body.secretaire;
  delete req.body.secretaire;
  delete req.body.name;
  delete req.body.fname;
  delete req.body.city;
  delete req.body.street;
  delete req.body.zip;
  delete req.body.sexe;
  user.generateHash(req.body.password)
  .then(hashedPassword => {
    req.body.password = hashedPassword;
    let userr = new user(req.body);
    userr.save((err,user) => {
      req.body.id_user = user._id;
      let doc = new doctor(req.body)
      doc.save((err) => {
        if (err) {
            console.log(err)
            res.json('erreur')
        } else {
            res.json('doctor added !!')
        }
      })
    });
  });
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

router.get('/delete/:id', (req, res,next) => {
  doctor.deleteOne({ id_user: req.params.id }, (err) => {
    if (err)
        console.log(err);
    else {
      user.deleteOne({ _id: req.params.id }, (err,user) => {
        console.log(user);
        res.json('Doctor removed !! user removed');
      })
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
  user.generateHash(req.body.password)
  .then(hashedPassword => {
    req.body.password = hashedPassword;
    req.body.role = {
      isSecretary : true
    };
    let userr = new user(req.body);
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