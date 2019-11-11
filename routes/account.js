var express = require('express');
var router = express.Router();
const db = require('../db');
const fs = require('fs');


router.post('/edit', (req,res)=>{
    if(!res.locals.loggedIn) {
        res.json({
            msg: "badToken"
        })
        return;
    }
    // // console.log(res.locals.loggedIn,"hello???");
    const {
        profile
    } = req.body
    console.log(req.files);
    console.log(req.body);
   const files = req.files;
   const filesByName = Object.keys(files);
   const fileNames = filesByName.map(ref => {
     const file = files[ref];
     let fileName = `${file.name.split('.')[0]}_${Date.now()}.${file.name.split('.')[1]}`;
     file.mv(`./public/images/${fileName}`, async function(err) {
        if (err) {
        return res.json({message:'error - No files were uploaded.'});
     }
     });    
     const dbfileName = `/images//${fileName}`
     console.log(dbfileName);
     return dbfileName;
   });
    //bannerimage[1]
    const bannerImage = fileNames[1];
    const profileImage = fileNames[0];
    console.log(fileNames);
    
    const insertProfileQuery = `UPDATE users SET profile = ?, imageUrl = ?, bannerUrl = ? WHERE id = ?`
    let theQuery = db.query(insertProfileQuery, [profile, profileImage, bannerImage ,res.locals.uid],(err)=>{
        if(err) throw err;
        res.json({
            msg:'updated'
        })
    })
    // console.log(theQuery.sql);
    // console.log('QUERYDUN');
    // console.log(finalFilePath);
})
router.get('/',(req, res)=>{
    console.log("is this happening?")
  
  console.log("hello? hello")
const urQuery = `SELECT community.name, community.type, community.description, community.uid, users.displayname, community.id FROM community, users WHERE users.id = community.uid AND users.displayname = users.displayname`
theUrQuery = db.query(urQuery, (err, results) => {
      if(err) throw err;
      res.json(
        results
      )
      console.log(theUrQuery.sql)
    })
    console.log('hello?')
  })
module.exports = router;