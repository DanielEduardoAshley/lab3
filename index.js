const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const {publicRouter} = require('./routes/public');
const {privateRouter} = require('./routes/private'); 
const {authentication} = require('./services/middleware')
const port = 4100;

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use('',publicRouter);
app.use(authentication);
app.use('',privateRouter);



app.listen(port, (()=>{

console.log('helloWorld')


}))
