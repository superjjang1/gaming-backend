var express = require('express');
var router = express.Router();
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
        game,
        url,
        description,
        participants,
        date1,
        time,
        date2
    } = req.body
    console.log(req.body.name);
    const insertTournamentQuery = `INSERT INTO tournament (uid, name, game, url, description, participants, date1, time, date2) VALUES (?,?,?,?,?,?,?,?,?)`;
    const dbValues = [res.locals.uid, name, game, url, description, participants, date1, time, date2]
    db.query(insertTournamentQuery, dbValues, (err)=>{
        if(err) throw err;
        res.json({
            msg:"tournamentAdded"
        })
    })
})
router.get('/',(req,res)=>{
    const tournamentQuery = `SELECT * FROM tournament`
    let theQuery = db.query(tournamentQuery, (err,results)=>{
        if(err) throw err;
        res.json(
            results
        )
        console.log(theQuery.sql)
    })
})
module.exports = router;