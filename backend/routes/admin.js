const router = require('express').Router()
const doctor = require('../models/doctor')

router.get('/listAll',(req,res)=>{
    doctor.find({},(err , results)=>{
        if(err) {console.log(err)}
        else{
            res.json(results)
        }
    })
})


router.post('/addOne',(req,res)=>{
    let doc = new doctor(req.body)
    doc.save((err)=>{
        if(err) {console.log(err)
        res.json('erreur')}
        else{
            res.json('doctor added !!')
        }
    })
})


router.post('/update/:id',(req, res,next) => {
    doctor.findById(req.params.id, (err, result) => {
        if (!result)
            return next(new Error('Could not load document'));
        else {
            let doc = new doctor()
            doc = req.body
            doc.save((err)=>{
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
    doctor.findByIdAndRemove({_id: req.params.id}, (err, results) => {
        if (err)
            console.log(err);
        else
            res.json('Remove successfully');
    })
})


module.exports = router;