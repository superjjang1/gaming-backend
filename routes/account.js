var express = require('express');
var router = express.Router();
const db = require('../db');
const fs = require('fs');

router.post('/', (req,res)=>{
    if(!res.locals.loggedIn) {
        res.json({
            msg: "badToken"
        })
        return;
    }
    console.log(res.locals.loggedIn,"hello???");
    const {
        profile,
        imageUrl,
        bannerUrl
    } = req.body
    console.log(req.body);
    // const f = req.file;
    // const f1 = req.file;
    // const finalFilePath = f.destination + '/' + Date.now() + f.originalname;
    // const filePathForDb = finalFilePath.slice(8)
    // fs.rename(f.path, finalFilePath, (err)=>{
    //     if (err) throw err;
    // })
    const insertProfileQuery = `UPDATE users SET profile = ? WHERE id = ?`
    let theQuery = db.query(insertProfileQuery, [profile,res.locals.uid],(err)=>{
        if(err) throw err;
        res.json({
            msg:'updated'
        })
    })
    console.log(theQuery.sql);
    console.log('QUERYDUN');
    // console.log(finalFilePath);
})
module.exports = router;