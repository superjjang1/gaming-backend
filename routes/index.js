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
  theQuery = db.query(accountQuery, [displayname, profile, imageUrl, bannerUrl, res.locals.uid],(err,results)=>{
    if(err) throw err;
    res.json({
      results
    })
  })
})
router.get('/community',(req,res)=>{
  const communityQuery = `SELECT community.name, community.type, community.description, community.uid, users.displayname, community.id FROM community, users WHERE users.id = community.uid`
  theQuuuery = db.query(communityQuery, (err,results)=>{
    if(err) throw err;
    res.json(
      results
    )
  })
})
router.get('/my-account',(req, res)=>{
  if(!res.locals.loggedIn){
    res.json({
        msg:"badToken"
    })
    return;
}
  const urQuery = `SELECT community.name, community.type, community.description, community.uid, users.displayname, community.id FROM community, users WHERE users.id = community.uid`
  theUrQuery = db.query(urQuery, (err, results) => {
    if(err) throw err;
    res.json(
      results
    )
  })
  console.log('hello?')
})
router.get('/community/:communityId',(req,res)=>{
  const communityId = req.params.communityId;
  const getCommunityQuery = `SELECT community.name, community.type, community.description, community.uid, community.id, displayname FROM community, users WHERE community.id = ? AND community.uid = users.id
  `;
  db.query(getCommunityQuery,[communityId],(err,result)=>{
    if(err) throw err;
    res.json(result[0])
  })
})
router.post('/community/:communityId',async (req,res, next)=>{
  if(!res.locals.loggedIn){
    res.json({
      msg:"badToken"
    })
    return;
  }
  const communityId = req.body.community.id
  console.log(req.body.community.id)
  console.log(res.locals.uid)
  const checkUserQuery = `SELECT * FROM communityUsers WHERE UID = ?`
  let thQuery = await db.query(checkUserQuery,[res.locals.uid],(err,results)=>{
    if(err){
      throw err
    };
    console.log(thQuery.sql);
    console.log(results);
    if (results.length > 0){
      res.json({
        msg:"already in"
      })
    }else{
      const joinCommunity = `INSERT INTO communityUsers(CID, UID) VALUES (?,?)`
      const dbValues = [communityId, res.locals.uid]
      console.log(dbValues);
      
      let newQuery = db.query(joinCommunity,dbValues,(err2)=>{
        if(err2) throw err2;
        res.json({
          msg: "you've joined"
        })
      })
      console.log(newQuery.sql);
    }
  })
})
router.get('/tournaments/:tournamentId',(req,res)=>{
  const tournamentId = req.params.tournamentId;
  const getTournamentQuery=`SELECT tournament.name, tournament.game, tournament.description, tournament.participants, tournament.date_added, tournament.date1, tournament.time, tournament.date2, displayname FROM tournament, users WHERE tournament.id = ? AND tournament.uid = users.id`;
  db.query(getTournamentQuery, [tournamentId],(err, result)=>{
    if(err) throw err;
    res.json(result[0])
  })
  
})

module.exports = router;
