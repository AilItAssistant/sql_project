import mariadb from "mariadb";
import "dotenv/config";

import app from "./server.mjs";

app.listen(4000, () => {
    console.log(`Server running at http://127.0.0.1:4000`);
    });

export const pool = mariadb.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,        
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    connectionLimit: 5
});