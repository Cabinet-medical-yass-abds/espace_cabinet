const router = require('express').Router()
const Patient = require('../models/patient')

router.get('/listAll',(req,res)=>{
    Patient.find({},(err , results)=>{
        if(err) {console.log(err)}
        else{
            res.json(results)
        }
    })
})


router.post('/addone',(req,res)=>{
    let pa = new Patient(req.body)
    pa.save((err)=>{
        if(err) {console.log(err)
        res.json('erreur')}
        else{
            res.json('patient added !!')
        }
    })
})


router.post('/update/:id',(req, res,next) => {
    Patient.findById(req.params.id, (err, result) => {
        if (!result)
            return next(new Error('Could not load document'));
        else {
            result.nom = req.body.nom;
            result.prenom = req.body.prenom;
            result.email = req.body.email;
            result.password = req.body.password;

            result.save((err)=>{
                if(err) {console.log(err)
                    res.json('erreur')}
                else{
                    res.json('patient updated !!')
                }
            })
        }
    });
});

router.delete('/delete/:id',(req, res) => {
    Patient.findByIdAndRemove({_id: req.params.id}, (err, results) => {
        if (err)
            console.log(err);
        else
            res.json('Remove successfully');
    })
})



module.exports = router;