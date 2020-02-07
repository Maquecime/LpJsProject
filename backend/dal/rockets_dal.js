
const { Pool } = require('pg');
const uuid = require('uuidv4');
const pool = new Pool({
        user:'db_user',
        host:'database',
        database: 'db_db',
        password: 'db_password'
    });

async function deleteRocket(uuidReceived){
    let answ = await pool.query('DELETE FROM rockets WHERE id=$1;',
    [uuidReceived]).catch(err => {
        throw err;
    });
}

async function getOneRocket(uuidReceived){
    let answ = await pool.query('SELECT * from rockets WHERE id=$1;',
    [uuidReceived]).catch(err => {
        throw err;
    });
    return answ.rows;
}

async function getAllRockets(){
    let answ = await pool.query('SELECT * from rockets;').catch(err =>{
        throw err;
    });
    return answ;
}

async function updateRocket(rocket){
    let answ = await pool.query('UPDATE rockets SET "name"=$1 ,"country"=$2 ,"takeOffThrust"=$3 WHERE "id"=$4;',
    [rocket.name, rocket.country, rocket.takeOffThrust, rocket.id]).catch(err =>{
        throw err;
    });
    return answ;
}

async function insertRocket(rocket){
    const newUuid = uuid.uuid();
    let answ = await pool.query('INSERT INTO rockets("id","name","country","takeOffThrust") VALUES($1,$2,$3,$4);',
    [newUuid,rocket.name, rocket.country, rocket.takeOffThrust]).catch(err =>{
        throw err;
    });
    return newUuid;
}

module.exports={
    deleteRocket:deleteRocket,
    getAllRockets:getAllRockets,
    getOneRocket:getOneRocket,
    updateRocket:updateRocket,
    insertRocket:insertRocket
};
