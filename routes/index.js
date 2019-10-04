var express = require('express');
var router = express.Router();
const db = require('../db');
const config = require('../config');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
