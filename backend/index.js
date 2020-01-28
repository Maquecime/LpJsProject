const express = require('express');
const morgan = require('morgan');
const uuid = require('uuidv4');
const bodyParser = require('body-parser')
const maDal = require('./dal/rockets_dal')
console.log(maDal.deleteRocket)

const { Pool } = require('pg')

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/api/rockets', (req, res) => {
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })
    pool.query('SELECT * FROM rockets', (err, result) => {
        pool.end()        
            res.json(result.rows)
        });
        
    })

app.post('/api/rockets', (req, res) =>{
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
    })
    let uuid2 = uuid.uuid()
    pool.query('INSERT INTO rockets(id,name,country,takeOffThrust) VALUES($1,$2,$3,$4);', 
    [uuid2,req.body.name, req.body.country, req.body.takeOffThrust], 
    (err, result) => {
        if(err != undefined) {
            res.status(400).send(err);
        }
        const formattedResult = {id:uuid2, ...req.body}
        pool.end()
            res.status(201).json(formattedResult)
    });
})

app.put('/api/rockets/:id', (req, res) =>{
        const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
    })
    pool.query('UPDATE rockets SET name=$1, country=$2, takeOffThrust=$3 WHERE id=$4;', 
    [req.body.name, req.body.country, req.body.takeOffThrust,req.params.id], 
    (err, result) => {
        if(err != undefined) {
            res.status(400).send(err);
        }
        const formattedResult = {id:req.params.id, ...req.body}
        pool.end()
            res.json(formattedResult)
    });
})

app.get('/api/rockets/:id', (req, res) =>{
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
    })
    pool.query('SELECT * FROM rockets WHERE id=$1;', 
    [req.params.id], 
    (err, result) => {
        if(err != undefined) {
            res.status(404).send(err);
        }
        pool.end()
            res.json(result.rows)
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
        res.json(formattedResult)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send(err);
    });
})



app.get('/api/test', (req, res) => {
    res.send('Hello')
})

module.exports = app;