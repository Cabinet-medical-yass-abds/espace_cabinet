const router = require('express').Router();
const doctor = require('../models/doctor');
const secretere = require('../models/secretere');
const user = require('../models/user');


router.post('/addSecretary/:id_doc', (req, res) => {
  console.log('req.params.id_doc:',req.params.id_doc);
  // user.generateHash(req.body.password)
  // .then(hashedPassword => {
  //   req.body.password = hashedPassword;
  //   let userr = new user(req.body);
  //   userr.save((err,user) => {
  //     req.body.id_user = user._id;
  //     let doc = new doctor(req.body)
  //     doc.save((err) => {
  //       if (err) {
  //           console.log(err)
  //           res.json('erreur')
  //       } else {
  //           res.json('Secretary added !!')
  //       }
  //     })
  //   });
  // });
})
module.exports = router;