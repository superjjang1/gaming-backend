var express = require('express');
var router = express.Router();
const db = require('../db')
const bcrypt = require('bcryptjs');
const randToken = require('rand-token');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/Register', (req,res,next) => {
  const {
    first,
    last,
    pass,
    email,
    displayname
  } = req.body;
  if ((!first)||(!last)||(!pass)||(!email)||(!displayname)) {
    res.json({
      msg: 'not working'
    });
    return;
  }
  const checkUserQuery = `SELECT * FROM users WHERE email =?`
  db.query(checkUserQuery, [email], (err,results)=>{
    if(err) {
      throw err
    };
    if (results.length >0) {
      res.json({
        msg: "userExists"
      })
    }else {
      const insertUserQuery = `INSERT INTO users(first, last, email, pass, token, displayname) VALUES (?,?,?,?,?,?)`
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pass, salt);
      const token = randToken.uid(50);
      db.query(insertUserQuery, [first, last, email, hash, token, displayname], (err2)=>{
        if(err2){
          throw err2
        }
        res.json({
          msg: "userAdded",
          token,
          email,
          first,
          displayname
        })
      })
    }
  })
})

router.post('/login', (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  //first check for this email.
  const checkLogQuery = `Select * FROM users WHERE email = ?`
  db.query(checkLogQuery, [email], (err, results) => {
    if (err) {
      throw err
      //check to see if thre's a result
    };
    if (results.length > 0) {
      //at this stage, you've found the user.
      const thisRow = results[0]
      //find out if the pass is corrct
      const isValidPass = bcrypt.compareSync(pass, thisRow.pass)
      if (isValidPass) {
        //these are the things we're looking for
        const token = randToken.uid(50)
        const updateUserTokenQuery = `UPDATE users SET token = ? WHERE email = ?`
        db.query(updateUserTokenQuery, [token, email], (err) => {
          if (err) {
            throw err
          }
        })
        res.json({
          msg: "loggedIn",
          first: thisRow.first,
          email: thisRow.email,
          displayname: thisRow.displayname,
          profile: thisRow.profile,
          imageUrl: thisRow.imageUrl,
          bannerUrl: thisRow.bannerUrl,
          token
        })
      } else {
        //no pass
        res.json({
          msg: "badpass"
        })
      }
    } else {
      //no match
      res.json({
        msg: "noEmail"
      })
    }
  })
})


module.exports = router;
