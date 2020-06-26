const router = require('express').Router();
const doctor = require('../models/doctor');
const user = require('../models/user');

router.get('/listAll', (req, res) => {
    doctor.find({}, (err, results) => {
        if (err) { console.log(err) } else {
            // console.log('results:', results);
            res.json(results)
        }
    }).populate('id_user');

})


router.post('/addOne', (req, res) => {
    console.log('my req.body', req.body);
    let doc = new doctor(req.body)
    doc.save((err) => {
        if (err) {
            console.log(err)
            res.json('erreur')
        } else {
            res.json('doctor added !!')
        }
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

router.get('/delete/:id', (req, res) => {
    doctor.findByIdAndRemove({ _id: req.params.id }, (err, results) => {
        if (err)
            console.log(err);
        else
            res.json('Doctor deleted !!')
    })
})


module.exports = router;