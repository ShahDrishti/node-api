const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'star',
  port: 5432,
}); 
const query =(text, params)=>{
    return pool.query(text,params)
}

module.exports={
    // query: (text,params)=> pool.query(text,params)
    query
}
//module.exports = pool;
