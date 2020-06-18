const express = require('express')
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// init app
const app = express()
app.use(cors());
app.use(bodyParser.json());

//database config
mongoose.connect('mongodb://localhost:27017/cabinet', { useNewUrlParser: true ,useUnifiedTopology: true});
let db = mongoose.connection ;
// db connection verification (open)
db.once('open', () => {
    console.log('connected to mongodb')
});
// db connection verification (err)
db.on('error' , (err) => {
    console.log('error')
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//init routes
var routes = require('./routes/patient')


//******************** main route ***************************************/
app.get('/',(req,res)=>{
    res.send('backend worked !!')
})
app.use('/' , routes)


// server 
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})