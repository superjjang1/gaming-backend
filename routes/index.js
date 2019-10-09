var express = require('express');
var router = express.Router();
const db = require('../db');
const config = require('../config');
// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb){
//     cb(null, Date.now() + '-' +file.originalname)
//   }
// })
// var upload = multer({ storage: storage
// }).single('file');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('*', (req,res,next)=>{
  const token = req.body.token
  const getUserIdQuery = `SELECT id FROM users where token = ?`;
  db.query(getUserIdQuery, [token], (err,results)=>{
    if(err){throw err};
    if(results.length===0){
      res.locals.loggedIn=false
    }else{
      res.locals.loggedIn = true;
      res.locals.uid = results[0].id
    }
    next();
  })
})

router.get('/my-account',(req,res)=>{
  if(!res.locals.loggedIn){
      res.json({
          msg:"badToken"
      })
      return;
  }
  const accountQuery = `SELECT displayname, profile, imageUrl, bannerUrl FROM users WHERE id = ? `
  theQuery = db.query(accountQuery, [displayname, profile, imageUrl, bannerUrl, res.locals.uid],(err)=>{
    if(err) throw err;
    res.json({
      msg: 'updated'
    })
  })
})


module.exports = router;
