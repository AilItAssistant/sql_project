import "dotenv/config";
import { pool } from "../../index.mjs";

export const beforeCRUD = async (req, res, next) => {
    let conn;
    let table = req.baseUrl.split('/')[2];
    if(table === "alumnos"){table = "students"};
    let action = req.route.path.split('/')[1];
    console.log(req.data)
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            let content = JSON.stringify(req.body);
            if(req.body.id){
                let before;
                if(table === " users"){
                    before = await conn.query(`
                        select
                            id, username, email, password_hash, created_at, name,
                            last_name, phone_number, city_id, permission_id, status_id
                        from ${table} where id = ${req.body.id};`);
                } else {
                    before = await conn.query(`select * from ${table} where id = ${req.body.id};`);
                };
                before = before[0];
                before.id = before.id.toString();
                if(typeof before.status_id === 'bigint'){before.status_id = before.status_id.toString();};
                if(before.city_id){before.city_id = before.city_id.toString();};
                if(before.level_id){before.level_id = before.level_id.toString();};
                if(before.question_id){before.question_id = before.question_id.toString();};
                if(before.skill_id){before.skill_id = before.skill_id.toString();};
                if(before.level_id){before.level_id = before.level_id.toString();};
                if(before.block_id){before.block_id = before.block_id.toString();};
                if(before.department_id){before.department_id = before.department_id.toString();};
                if(before.permission_id){before.permission_id = before.permission_id.toString();};
                if(before.question_type_id){before.question_type_id = before.question_type_id.toString();};

                before = JSON.stringify(before);
                await conn.query(`
                    INSERT
                        INTO user_actions(user_id, action_type, input_data, data_before)
                    VALUES
                        (${req.data.id}, '${table + " " + action}','${content}', '${before}');
                `);
            } else {
                await conn.query(`
                    INSERT
                        INTO user_actions(user_id, action_type, input_data)
                    VALUES
                        (${req.data.id}, '${table + " " + action}','${content}');
                `);
            };
            next();
        } catch (error) {
            console.log(error);
            next();
        };
    } else {
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, input_data)
                VALUES
                    (${req.data.id},'Without data login');
            `);
            next();
        } catch (error) {
            console.log(error);
            next();
        };
    };
};

export const afterCRUD = async (req, res, next) => {
    let conn;
    let table = req.baseUrl.split('/')[2];
    if(table === "alumnos"){table = "students"};
    let action = req.route.path.split('/')[1];
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            let content = JSON.stringify(req.body);
            if(req.body.id){
                let before;
                if(table === " users"){
                    before = await conn.query(`
                        select
                            id, username, email, password_hash, created_at, name,
                            last_name, phone_number, city_id, permission_id, status_id
                        from ${table} where id = ${req.body.id};`);
                } else {
                    before = await conn.query(`select * from ${table} where id = ${req.body.id};`);
                };
                before = before[0];
                before.id = before.id.toString();
                if(before.city_id){before.city_id = before.city_id.toString();};
                if(before.level_id){before.level_id = before.level_id.toString();};
                if(before.question_id){before.question_id = before.question_id.toString();};
                if(typeof before.status_id === 'bigint'){before.status_id = before.status_id.toString();};
                if(before.skill_id){before.skill_id = before.skill_id.toString();};
                if(before.level_id){before.level_id = before.level_id.toString();};
                if(before.block_id){before.block_id = before.block_id.toString();};
                if(before.department_id){before.department_id = before.department_id.toString();};
                if(before.permission_id){before.permission_id = before.permission_id.toString();};
                if(before.question_type_id){before.question_type_id = before.question_type_id.toString();};
                console.log(before)
                before = JSON.stringify(before);
                await conn.query(`
                    INSERT
                        INTO user_actions(user_id, action_type, input_data, data_after)
                    VALUES
                        (${req.data.id}, '${table + " " + action}','${content}', '${before}');
                `);
            } else {
                await conn.query(`
                    INSERT
                        INTO user_actions(user_id, action_type, input_data)
                    VALUES
                        (${req.data.id}, '${table + " " + action}','${content}');
                `);
            };
            next();
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const exam = async (req, res, next) => {
    let conn;
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            let exam = JSON.stringify(req.body);
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, action_type, input_data)
                VALUES
                    (${req.data.id}, 'create exam','${exam}');
            `);
            next();
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const add = async (req, res, next) => {
    let conn;
    let table = req.baseUrl.split('/')[2];
    if(table === "alumnos"){table = "students"};
    let action = req.route.path.split('/')[1];
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            let content = JSON.stringify(req.body);
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, action_type, input_data)
                VALUES
                    (${req.data.id}, '${table + " " + action}','${content}');
            `);
            next();
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const filter = async (req, res, next) => {
    let conn;
    let table = req.baseUrl.split('/')[2];
    if(table === "alumnos"){table = "students"};
    let action = "filter";
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            let filter = JSON.stringify(req.body);
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, action_type, input_data)
                VALUES
                    (${req.data.id}, '${table + " " + action}','${filter}');
            `);
            next();
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const entryPage = async (req, res, next) => {
    let conn;
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, action_type)
                VALUES
                    (${req.data.id}, 'entry in page: ${req.body.name}');
            `);
            res.status(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};