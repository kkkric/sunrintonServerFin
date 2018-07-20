const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
const path = require('path');
const multer = require('multer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./mongo');


require('./routes/auth')(app,Users,rndstring,multer,path,Social);
require('./routes/social')(app,Social,path, multer)
app.listen(3000, ()=>{
  console.log('Server On!');
})

module.exports = app;
