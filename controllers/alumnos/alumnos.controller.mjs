import "dotenv/config";
import { pool } from "../../index.mjs";

//?GET ALL ALUMNOS alumnos.get("/", getAlumnos);

export const getAlumnos = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.id AS student_id,
                    s.name AS student_name,
                    s.phone_number AS student_phone_number,
                    s.last_name AS student_last_name,
                    s.email,
                    s.date_of_birth,
                    cty.name as city,
                    cty.id as city_id,
                    s.enrollment_date,
                    s.address,
                    s.identification_document,
                    st.name AS student_status,
                    st.id AS student_status_id,
                    COALESCE(c.name, 'No tiene clase') AS class_name,
                    COALESCE(c.id, 'No tiene id') AS class_id,
                    COALESCE(cl.name, 'N/A') AS class_level,
                    COALESCE(sl.name, 'N/A') AS student_level,
                    COALESCE(sl.id, 'N/A') AS student_level_id,
                    COALESCE(t.name, 'N/A') AS teacher_name
                FROM
                    students s
                LEFT JOIN student_classes sc ON s.id = sc.student_id
                LEFT JOIN classes c ON sc.class_id = c.id
                LEFT JOIN class_teachers ct ON c.id = ct.class_id
                LEFT JOIN teachers t ON ct.teacher_id = t.id
                LEFT JOIN levels cl ON c.level_id = cl.id
                LEFT JOIN levels sl ON s.level_id = sl.id
                left join cities cty on s.city_id = cty.id
                left join status st on s.status_id = st.id
                ORDER BY
                    s.id,
                    c.id;
            `);
            rows.forEach((element) => {
                element.student_id = element.student_id.toString();
                if(element.enrollment_date){element.enrollment_date = element.enrollment_date.toLocaleDateString('es-ES', {year: 'numeric', month: 'numeric', day: 'numeric',});}
                if(element.date_of_birth){element.date_of_birth = element.date_of_birth.toLocaleDateString('es-ES', {year: 'numeric', month: 'numeric', day: 'numeric',});}
                if(element.student_level_id){element.student_level_id = element.student_level_id.toString();};
                if(element.city_id){element.city_id = element.city_id.toString();};
            });
            let response = [];
            for (let i = 0; rows.length > i; i++) {
                let x;
                if (i >= 1) {
                    x = i - 1;
                } else {
                    x = 0;
                };

                if (i === 0 || rows[i].student_id !== rows[x].student_id) {
                    let add = {
                        student_id: rows[i].student_id,
                        email: rows[i].email,
                        phone_number: rows[i].student_phone_number,
                        last_name: rows[i].student_last_name,
                        id_document: rows[i].identification_document,
                        student_level: rows[i].student_level,
                        student_level_id: rows[i].student_level_id,
                        name: rows[i].student_name,
                        birthday: rows[i].date_of_birth,
                        city: rows[i].city,
                        city_id: rows[i].city_id,
                        enrollment_date: rows[i].enrollment_date,
                        address: rows[i].address,
                        student_phone: rows[i].student_phone,
                        student_status: rows[i].student_status,
                        classes: [],
                    };
                    response.push(add);
                    if (rows[i].class_id !== "No tiene id") {
                        let addClass = {
                            class_id: rows[i].class_id,
                            class_level: rows[i].class_level,
                            class_name: rows[i].class_name,
                            class_teacher: rows[i].teacher_name,
                        };
                        add.classes.push(addClass);
                    }
                } else {
                    let add = {
                        class_id: rows[i].class_id,
                        class_name: rows[i].class_name,
                        class_level: rows[i].class_level,
                        class_teacher: rows[i].teacher_name,
                    };
                    response[response.length - 1].classes.push(add);
                }
            };
            let resp = {
                students: response,
                dataLogin: req.data
            }
            res.json(resp);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const filterAlumnos = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.id AS student_id,
                    s.name AS student_name,
                    s.phone_number AS student_phone_number,
                    s.last_name AS student_last_name,
                    s.email,
                    cty.name as city,
                    s.identification_document,
                    st.name AS student_status,
                    st.id AS student_status_id,
                    COALESCE(c.name, 'No tiene clase') AS class_name,
                    COALESCE(c.id, 'No tiene id') AS class_id,
                    COALESCE(l.name, 'N/A') AS class_level,
                    COALESCE(t.name, 'N/A') AS teacher_name
                FROM
                    students s
                LEFT JOIN student_classes sc ON s.id = sc.student_id
                LEFT JOIN classes c ON sc.class_id = c.id
                LEFT JOIN levels l ON c.level_id = l.id
                LEFT JOIN class_teachers ct ON c.id = ct.class_id
                LEFT JOIN teachers t ON ct.teacher_id = t.id
                left join cities cty on s.city_id = cty.id
                left join status st on s.status_id = st.id
                WHERE
                    (s.last_name LIKE CONCAT(IFNULL('${req.body.last_name}', ''), '%')) OR
                    (s.identification_document LIKE CONCAT(IFNULL('${req.body.identification_number}', ''), '%')) OR
                    (s.phone_number LIKE CONCAT(IFNULL('${req.body.phone_number}', ''), '%')) OR
                    (s.city_id LIKE CONCAT(IFNULL('${req.body.city}', ''), '%')) OR
                    (s.email LIKE CONCAT(IFNULL('${req.body.email}', ''), '%'))
                ORDER BY
                    s.id, c.id;
            `);
            rows.forEach((element) => {
                element.student_id = element.student_id.toString();
            });
            let response = [];
            for (let i = 0; rows.length > i; i++) {
                let x;
                if (i >= 1) {
                    x = i - 1;
                } else {
                    x = 0;
                };

                if (i === 0 || rows[i].student_id !== rows[x].student_id) {
                    let add = {
                        student_id: rows[i].student_id,
                        email: rows[i].email,
                        phone_number: rows[i].student_phone_number,
                        last_name: rows[i].student_last_name,
                        id_document: rows[i].identification_document,
                        student_level: rows[i].student_level,
                        name: rows[i].student_name,
                        city: rows[i].city,
                        student_phone: rows[i].student_phone,
                        student_status: rows[i].student_status,
                        classes: [],
                    };
                    response.push(add);
                    if (rows[i].class_id !== "No tiene id") {
                        let addClass = {
                            class_id: rows[i].class_id,
                            class_level: rows[i].class_level,
                            class_name: rows[i].class_name,
                            class_teacher: rows[i].teacher_name,
                        };
                        add.classes.push(addClass);
                    }
                } else {
                    let add = {
                        class_id: rows[i].class_id,
                        class_name: rows[i].class_name,
                        class_level: rows[i].class_level,
                        class_teacher: rows[i].teacher_name,
                    };
                    response[response.length - 1].classes.push(add);
                }
            }
            res.json(response);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const statusAlumno = async (req, res, next) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if( req.body.status === "active" ) {
                await conn.query(`
                    UPDATE
                        students
                    SET
                        status_id = 0
                    WHERE
                        id = ${req.body.id};
                `);
            } else if( req.body.status === "inactive" ) {
                await conn.query(`
                    UPDATE
                        students
                    SET
                        status_id = 1
                    WHERE
                        id = ${req.body.id};
                `);
            }else {
                await conn.query(`
                    UPDATE
                        students
                    SET
                        status_id = 1
                    WHERE
                        id = ${req.body.id};
                `);
            };
            res.json(200);
            next();
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteAlumno = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                DELETE FROM
                    students
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

export const addAlumno = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                INSERT INTO students (
                    name,
                    last_name,
                    email,
                    date_of_birth,
                    enrollment_date,
                    phone_number,
                    address,
                    identification_document,
                    city_id,
                    level_id,
                    status_id)
                VALUES (
                    '${req.body.name}',
                    '${req.body.last_name}',
                    '${req.body.email}',
                    '${req.body.birthday}',
                    ${req.body.enrollment_date},
                    '${req.body.phone_number}',
                    '${req.body.address}',
                    '${req.body.document}',
                    ${req.body.city_id},
                    ${req.body.level_id},
                    1
                );
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editAlumno = async (req, res, next) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                UPDATE students
                SET
                    name = IF('${req.body.name}' != '', '${req.body.name}', name),
                    last_name = IF('${req.body.last_name}' != '', '${req.body.last_name}', last_name),
                    email = IF('${req.body.email}' != '', '${req.body.email}', email),
                    enrollment_date = IF('${req.body.enrollment_date}' != '', '${req.body.enrollment_date}', enrollment_date),
                    phone_number = IF('${req.body.phone_number}' != '', '${req.body.phone_number}', phone_number),
                    address = IF('${req.body.address}' != '', '${req.body.address}', address),
                    date_of_birth = IF('${req.body.birthday}' != '', '${req.body.birthday}', date_of_birth),
                    city_id = IF('${req.body.city_id}' != '', '${req.body.city_id}', city_id),
                    level_id = IF('${req.body.level}' != '' AND EXISTS (SELECT 1 FROM levels WHERE id = '${req.body.level}'), '${req.body.level}', level_id),
                    identification_document = IF('${req.body.document}' != '', '${req.body.document}', identification_document)
                WHERE
                    id = ${req.body.id};
            `);
            res.json(200);
            next();
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const addClass = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO
                    student_classes (student_id, class_id, enrollment_date)
                VALUES
                    (${req.body.student_id}, ${req.body.class_id}, CURRENT_DATE);
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteClass = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM
                    student_classes
                WHERE
                    student_id = ${req.body.student_id}
                AND
                    class_id = ${req.body.class_id};
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const alumnoByClassId = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.id AS student_id,
                    s.name AS student_name,
                    s.last_name AS student_last_name,
                    COALESCE(sl.name, 'N/A') AS student_level,
                    c.name AS student_city,
                    c.id AS student_city_id
                FROM
                    student_classes sc
                JOIN students s ON sc.student_id = s.id
                LEFT JOIN levels sl ON s.level_id = sl.id
                left join cities c on s.city_id = c.id
                WHERE
                    sc.class_id = ${req.body.id};
            `);
            rows.forEach((element) => {
                element.student_id = element.student_id.toString();
                if(element.student_city_id){element.student_city_id = element.student_city_id.toString();};
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};