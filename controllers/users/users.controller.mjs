import "dotenv/config";
import { pool } from "../../index.mjs";
import jwt from 'jsonwebtoken';

//?GET ALL USERS users.get("/", getUsers);

export const getUsers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(
                `SELECT 
                    id, 
                    username, 
                    email, 
                    created_at, 
                    name, 
                    last_name, 
                    phone_number, 
                    city, 
                    permissions, 
                    status 
                from 
                    users;
                `);
            rows.forEach((element) => {
                element.id = element.id.toString();
                element.created_at = element.created_at.toLocaleDateString('es-ES', {year: 'numeric', month: 'numeric', day: 'numeric',});
            });
            let response = {
                users: rows,
                dataLogin: req.data
            };
            res.json(response);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    };
};

export const filterUsers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            console.log(req.body)
            conn = await pool.getConnection();
            let rows = await conn.query(
                `SELECT 
                    id, username, email, role, created_at, name, last_name, phone_number, city, permissions, status 
                from 
                    users 
                WHERE 
                    (last_name LIKE CONCAT(IFNULL('${req.body.last_name}', ''), '%')) OR
                    (username LIKE CONCAT(IFNULL('${req.body.username}', ''), '%')) OR
                    (phone_number LIKE CONCAT(IFNULL('${req.body.phone_number}', ''), '%')) OR
                    (city LIKE CONCAT(IFNULL('${req.body.city}', ''), '%')) OR
                    (permissions LIKE CONCAT(IFNULL('${req.body.permissions}', ''), '%')) OR
                    (status LIKE CONCAT(IFNULL('${req.body.status}', ''), '%')) OR
                    (email LIKE CONCAT(IFNULL('${req.body.email}', ''), '%'));`
            );
            console.log(rows)
            rows.forEach((element) => {
                element.id = element.id.toString();
                element.created_at = element.created_at.toLocaleDateString('es-ES', {year: 'numeric', month: 'numeric', day: 'numeric',});
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const statusUsers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if( req.body.status === "active" ) {
                let rows = await conn.query(`
                    UPDATE 
                        users
                    SET 
                        status = 'inactive'
                    WHERE 
                        id = ${req.body.id};
                `);
            } else if( req.body.status === "inactive" ) {
                let rows = await conn.query(`
                    UPDATE 
                        users
                    SET 
                        status = 'active'
                    WHERE 
                        id = ${req.body.id};
                `);
            }else {
                let rows = await conn.query(`
                    UPDATE 
                        users
                    SET 
                        status = 'active'
                    WHERE 
                        id = ${req.body.id};
                `);
            };
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteUsers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`DELETE FROM 
                    users
                WHERE 
                    id = ${req.body.id};
            `);
            
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const addUsers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                INSERT INTO users (
                    username, 
                    email, 
                    password_hash,  
                    name, 
                    last_name, 
                    phone_number, 
                    city, 
                    permissions, 
                    status
                ) VALUES (
                    '${req.body.username}',                 
                    '${req.body.email}',
                    'hashed_password',
                    '${req.body.name}',
                    '${req.body.last_name}',
                    '${req.body.phone_number}',             
                    '${req.body.city}',
                    '${req.body.permissions}',
                    '${req.body.status}'
                );
                `);
            
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    };
};

export const editUsers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                UPDATE 
                    users
                SET 
                    username = IF('${req.body.username}' != '', '${req.body.username}', username),
                    email = IF('${req.body.email}' != '', '${req.body.email}', email),
                    password_hash = IF('${req.body.password_hash}' != '', '${req.body.password_hash}', password_hash),
                    name = IF('${req.body.name}' != '', '${req.body.name}', name),
                    last_name = IF('${req.body.last_name}' != '', '${req.body.last_name}', last_name),
                    phone_number = IF('${req.body.phone_number}' != '', '${req.body.phone_number}', phone_number),
                    city = IF('${req.body.city}' != '', '${req.body.city}', city),
                    permissions = IF('${req.body.permissions}' != '', '${req.body.permissions}', permissions),
                    status = IF('${req.body.status}' != '', '${req.body.status}', status)
                WHERE 
                    id = ${req.body.id};
                `);
            
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const login = async ( req, res ) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`select username, permissions, name, last_name from users where username = '${req.body.user}' and password_hash = '${req.body.pass}';`);
        
        if( rows.length > 0){
            let data = JSON.stringify(rows[0]);
            const token = jwt.sign(data, 'stil');
            res.json({token})
        } else {
            res.json('Usuario o clave incorrecto');
        };
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    };
};

export function verifyToken( req, res, next ){
    console.log(req.headers.authorization)
    if( !req.headers.authorization ) { 
        console.log('no llega token')
        return res.status(401).json('No autorizado');
    };
    const token = req.headers.authorization;
    if( token !== '' ){
        let content;
        try {
            console.log('llega al try')
            content = jwt.verify(token,'stil');
            req.data = content;
            console.log('sale del try')
            res.status(200);
            next();
        } catch ( err ) {
            console.log('llega al error')
            console.log(err);
            res.status(401).json("Token incorrecto");
            next();
        }
    }else{
        console.log('token vacio')
        res.status(401).json('Token vacio');
    };
};

export function verifyTokenHeader( req, res, next ){
    console.log(req.headers.authorization)
    if( !req.headers.authorization ) { 
        console.log('no llega token')
        return res.status(401).json('No autorizado');
    };
    const token = req.headers.authorization;
    if( token !== '' ){
        let content;
        try {
            console.log('llega al try')
            content = jwt.verify(token,'stil');
            req.data = content;
            res.status(200).json(content);
            console.log('sale del try')
            next();
        } catch ( err ) {
            console.log('llega al error')
            console.log(err);
            res.status(401).json("Token incorrecto");
            next();
        }
    }else{
        console.log('token vacio')
        res.status(401).json('Token vacio');
    };
};