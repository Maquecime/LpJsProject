const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid/v4');

const { Pool } = require('pg')

const app = express();

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
    pool.query('INSERT INTO rockets(id,name,country,takeOffThrust) VALUES(?,?,?,?);', 
    [uuid(),req.body.name, req.body.country, req.body.takeOffThrust], 
    (err, result) => {
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
    pool.query('UPDATE rockets SET name=?, country=?, takeOffThrust=? WHERE id=?;', 
    [req.body.name, req.body.country, req.body.takeOffThrust,req.query.params.id], 
    (err, result) => {
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
    [req.query.id], 
    (err, result) => {
        console.log(err);
        console.log(result);
        pool.end()
            res.json(result.rows)
    });
})



app.get('/api/test', (req, res) => {
    res.send('Hello')
})

module.exports = app;