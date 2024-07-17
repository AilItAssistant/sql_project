import mariadb from "mariadb";
import "dotenv/config";

const pool = mariadb.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    connectionLimit: 5
});

async function firstConnection(){
    let conn;
    try{
        conn = await pool.getConnection();
        let rows = await conn.query("select * from accommodation");
        console.log(rows);
        //let res = await conn.query("");
        //console.log(res);
    }catch (err){
        console.log(err);
    }finally{
        if (conn) return conn.end();
    }
} 
firstConnection();