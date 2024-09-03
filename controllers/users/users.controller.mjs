import "dotenv/config";
import { pool } from "../../index.mjs";

//?GET ALL USERS users.get("/", getUsers);

export const getUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(
            "SELECT id, username, email, role, created_at, name, last_name, phone_number, city, permissions, status from users;"
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
    }
};

export const filterUsers = async (req, res) => {
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
    }
};

export const statusUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(``);
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const deleteUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(``);
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const addUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(``);
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const editUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(``);
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};