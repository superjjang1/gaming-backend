var express = require('express');
var router= express.Router();
const db = require('../db');

router.post('/new',async (req,res,next)=>{
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
    if ((!name)||(!type)||(!description)) {
        res.json({
            msg:'not working'
        });
        return;
    }
    const insertCommunityQuery = `INSERT INTO community (uid, name, type, description) VALUES (?,?,?,?)`;
    const dbValues = [res.locals.uid, name, type, description]

    let theQuery = await db.query(insertCommunityQuery, dbValues,(err,results)=>{
        if(err) throw err;
        const {
            UID,
            CID
        } = req.body
        console.log("testing")
        console.log(results.insertId)
        const insertCommunityUsers = `INSERT INTO communityUsers (UID, CID) VALUES (?,?)`
        const dbValues = [res.locals.uid, results.insertId]
        let newQuery = db.query(insertCommunityUsers, dbValues,(err)=>{
            if(err) throw err;
            res.json({
                msg:"communitypeople added"
            })
            console.log(newQuery.sql);
            console.log('newQuery?');
        })
    })
    console.log(theQuery.sql);
    console.log('doing things')
})


module.exports = router;