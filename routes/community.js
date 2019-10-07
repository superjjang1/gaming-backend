var express = require('express');
var router= express.Router();
const db = require('../db');

router.post('/new',(req,res)=>{
    if(!res.locals.loggedIn){
        res.json({
            msg: "badToken"
        })
        return;
    }
    const {
        name,
        type,
        description
    } = req.body
    const insertCommunityQuery = `INSERT INTO community (uid, name, type, description) VALUES (?,?,?,?)`;
    const dbValues = [res.locals.uid, name, type, description]
    db.query(insertCommunityQuery, dbValues,(err)=>{
        if(err) throw err;
        res.json({
            msg:"communityAdded"
        })
    })
})
module.exports = router;