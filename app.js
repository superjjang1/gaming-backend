var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tournamentRouter = require('./routes/tournament');
var communityRouter = require('./routes/community');
var accountRouter = require('./routes/account');


var app = express();
const helmet = require('helmet');
const upload = require('express-fileupload');
app.use(helmet());
app.use(cors());
//allow cross-origin
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req,res,next)=>{
//   console.log(req.body);
//   console.log(req.files);
//   next();
// })
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload(
  {createParentPath:true}
))

app.use('/', indexRouter);
// app.use((req,res,next)=>{
//   console.log(req.body);
//   console.log(req.files);
//   next();
// })
app.use('/users', usersRouter);
app.use('/tournaments', tournamentRouter);
app.use('/tournament', tournamentRouter);
app.use('/community', communityRouter);
app.use('/my-account',accountRouter);

module.exports = app;
