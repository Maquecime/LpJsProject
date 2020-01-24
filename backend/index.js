const express = require('express');
const morgan = require('morgan');
const uuid = require('uuidv4');
const bodyParser = require('body-parser')

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
    pool.query('INSERT INTO rockets(id,name,country,takeOffThrust) VALUES($1,$2,$3,$4);', 
    [uuid.uuid(),req.body.name, req.body.country, req.body.takeOffThrust], 
    (err, result) => {
        if(err != undefined) {
            res.status(400).send(err);
        }
        pool.end()
            res.json(result.rows)
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
        pool.end()
            res.json(result.rows)
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
        console.log(result);
        pool.end()
            res.json(result.rows)
    });
})

app.delete('/api/rockets/:id', (req,res) => {
    const pool = new Pool({
        user:'db_user',
        host:'database',
        database: 'db_db',
        password: 'db_password'
    })
    pool.query('DELETE FROM rockets WHERE id=$1;',
    [req.params.id],
    (err,result) => {
        if(err != undefined) {
            res.status(404).send(err);
        }
        console.log(result);
        pool.end()
            res.json(result.rows)
    });
})



app.get('/api/test', (req, res) => {
    res.send('Hello')
})

module.exports = app;