var express = require('express');
var router = express.Router();

import verifyToken from '../../middleware/verifyToken';
import { DBINSTANCE } from '../../lib/mongoConnect';
import e from 'express';

router.post('/new',verifyToken, async function (req, res) {
        const col = DBINSTANCE.collection('Ideas');        
        const GetMain = await col.find({Author:req.user.UserName}).limit(1).toArray();
        if(GetMain.length == 1){            
            let newIdea = GetMain[0].Ideas;
            let doPush = true;
             
            newIdea.forEach((x)=>{
                console.log(x.Title == req.body.title)
                if(x.Title == req.body.title){
                    doPush = false;
                }
            });

            if(doPush){
                newIdea.push({
                    Title: req.body.title,
                    Text: req.body.text,
                    Ideas:[]
                })

                let lastResponse = await col.updateOne({Author:req.user.UserName},  {$set: {Ideas: newIdea}})
                return res.send('added idea');
            }else{
                    return res.status(404).send('idea already exist find');
            }  
        }    
})

router.post('/view',verifyToken, async function (req, res) {
    const col = DBINSTANCE.collection('Ideas');        
    const GetMain = await col.find({Author:req.user.UserName}).limit(1).toArray();
    res.send(GetMain[0].Ideas);
})

router.post('/view/:title*',verifyToken, async function (req, res) {
    const col = DBINSTANCE.collection('Ideas');        
    const GetMain = await col.find({Author:req.user.UserName}).limit(1).toArray();
    let error = false;
    let retVal;
    GetMain[0].Ideas.forEach((x,i,arr)=>{     
        if(x.Title == req.params.title){
            retVal = arr[i];          
        }else if(i == arr.length-1){
            error = true  
        }
    });

    if(!error){
        return res.status(400).send('Not found')
    }

    res.status(200).send(retVal);
})

module.exports = router