
const { Pool } = require('pg')
const pool = new Pool({
        user:'db_user',
        host:'database',
        database: 'db_db',
        password: 'db_password'
    })

async function deleteRocket(uuid){
    let answ = await pool.query('DELETE FROM rockets WHERE id=$1;',
    [uuid]).catch(err => {
        throw err;
    });
}
module.exports={
    deleteRocket:deleteRocket
}
