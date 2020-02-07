const express = require('express');
const morgan = require('morgan');
const uuid = require('uuidv4');
const bodyParser = require('body-parser')
const maDal = require('./dal/rockets_dal')

const { Pool } = require('pg')

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/api/rockets', (req, res) => {
    maDal.getAllRockets().then((answ)=>{
        res.json(answ.rows)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send(err);
    });
})

app.post('/api/rockets', (req, res) =>{
    let myNewRocket = {...req.body};
    maDal.insertRocket(myNewRocket).then((answ)=>{
        let formattedResult = {id:answ, ...req.body}
        res.status(201).json(formattedResult);
    }).catch(err =>{
        res.status(500).send(err);
    });
})

app.put('/api/rockets/:id', (req, res) =>{
    if(!req.params.id){
        res.status(400).send();
    }
    // if(uuid.isUuid(req.params.id)){
    //     res.status(400).send()
    // }
    let myNewRocket = {id:req.params.id, ...req.body}
    maDal.updateRocket(myNewRocket).then((answ)=>{
        if(answ.rowCount > 0){
            res.status(201).json(myNewRocket);
        }
        else{
            res.status(404).send()
        }
    }).catch(err =>{
        res.status(500).send(err);
    });
})

app.get('/api/rockets/:id', (req, res) =>{
    if(!req.params.id){
        res.status(400).send();
    }
    // if(uuid.isUuid(req.params.id)){
    //     res.status(400).send()
    // }
    maDal.getOneRocket(req.params.id).then((answ)=>{
        res.json(answ)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send(err);
    });
})

app.delete('/api/rockets/:id', (req,res) => {
    if(!req.params.id){
        res.status(400).send();
    }
    // if(uuid.isUuid(req.params.id)){
    //     res.status(400).send()
    // }
    maDal.deleteRocket(req.params.id).then(()=>{
        const formattedResult={id:req.params.id}
        res.status(204).json(formattedResult);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send(err);
    });
});


module.exports = app;