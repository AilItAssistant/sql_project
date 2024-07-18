import "dotenv/config";
import mariadb from "mariadb";
import PDFDocument from "pdfkit";

//?GET EXAM PDF exam.get("/", getExamPdf);;

/*export const getExamPdf = async (req, res) => {
    let conn;
    const pool = mariadb.createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        connectionLimit: 5
    });
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from alumnos");
        rows.forEach(element => {
            element.telefono_alumno = element.telefono_alumno.toString()
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};*/

function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument();
  
    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    /*doc.image("../media/LOGO.png", 320, 145, {width: 200, height: 100})
    .text('Logo', 320, 130);*/
  
    doc.fontSize(25).text("Examen de nivel A2", {align: 'center'}).moveDown(1);

    doc.fontSize(10).text("Fecha:", {align: 'left'}).moveDown(0.8);
    doc.fontSize(10).text("Nombre y apellido:", {align: 'left'}).moveDown(0.8);
    doc.fontSize(10).text("Puntuación sobre 100:", {align: 'left'}).moveDown(0.8);
    doc.fontSize(10).text("CORRESPONDENCIAS CON LA NOTA:", {align: 'left'}).moveDown(0.5);
    doc.fontSize(8).text("Inferior al 60% = No apto", {align: 'left'}).moveDown(0.5);
    doc.fontSize(8).text("60-70% = Apto/Suficiente", {align: 'left'}).moveDown(0.5);
    doc.fontSize(8).text("70-90% = Notable", {align: 'left'}).moveDown(0.5);
    doc.fontSize(8).text("90-100% = Sobresaliente", {align: 'left'}).moveDown(2);

    doc.fontSize(20).text("Instrucciones", {align: 'center'}).moveDown(1.2);
    doc.fontSize(10).text("1. Se recomienda leer detenidamente el enunciado y las cuestiones planteadas. No se podrá solicitar a los profesores ninguna aclaración sobre el contenido de los exámenes.").moveDown(0.5);
    doc.fontSize(10).text("2. El orden que se siga al contestar las preguntas es indiferente. Sin embargo, deberá quedar claramente identificada la pregunta a la que se está contestando.").moveDown(0.5);
    doc.fontSize(10).text("3. El examen se escribirá con bolígrafo o pluma de tinta indeleble azul o negra. Se permite el uso de material borrador o corrector (en concreto de tippex).").moveDown(0.5);
    doc.fontSize(10).text("4. En el cuadernillo no deberá aparecer ninguna señal de posible identificación de la identidad del estudiante, ni debe firmarse, pues cualquiera de estos casos supondría la calificación de 0 en en el ejercicio.").moveDown(0.5);
    doc.fontSize(10).text("5. En cada asignatura se dispondrá de una única propuesta de examen con varias preguntas. La elección de preguntas deberá realizarse conforme a las instrucciones planteadas, no siendo válido seleccionar preguntas que sumen más de 10 puntos, ni agrupaciones de preguntas que no coincidan con las indicadas; lo contrario podría conllevar la anulación de alguna pregunta que no se ajustara a las instrucciones.").moveDown(0.5);
    doc.fontSize(10).text("6. Sólo se podrá entregar un cuadernillo por ejercicio. Se deberá entregar siempre el cuadernillo, debidamente identificado con sus correspondientes etiquetas, aunque éste estuviese en blanco.").moveDown(0.5);
    doc.fontSize(10).text("7. Se pueden utilizar como borrador las partes del cuadernillo marcadas con un aspa o en gris. Esto no se corregirá.").moveDown(0.5);
    doc.fontSize(10).text("8. En caso de equivocación, o si se quiere rehacer el ejercicio, se podrá solicitar un nuevo cuadernillo para sustituir el que se tiene. Un profesor recogerá el cuadernillo a descartar y procederá a su rotura en presencia del estudiante. Si fuera necesario traspasar parte de lo ya escrito al nuevo cuadernillo, el profesor se mantendrá cerca del alumno hasta que haya terminado.").moveDown(0.5);
    doc.fontSize(10).text("9. El/la estudiante deberá colocar la etiqueta de identificación al finalizar el examen, por si se hubiera necesitado un nuevo cuadernillo, y, posteriormente, entregar el examen.").moveDown(0.5);

    doc.font('Helvetica');
        doc.initForm();

        let rootField = doc.formField('rootField');
        let field1 = doc.formField('field1', { parent: rootField });
        let field2 = doc.formField('field2', { parent: rootField });
        let field3 = doc.formField('field3', { parent: rootField });

        doc.formText('leaf1', 110, 130, 200, 10, {
            parent: field1,
            multiline: true
        });

        doc.formText('leaf2', 160, 150, 300, 10, {
        parent: field2,
        multiline: true
        });
        doc.formText('leaf3', 180, 170, 30, 10, {
        parent: field3,
        multiline: true
        });
        var opts = {
        backgroundColor: 'yellow',
        label: 'Test Button'
        };
        doc.formPushButton('btn1', 10, 200, 100, 30, opts);

    doc.end();
};

export const getExamPdf = async (req, res) => {
    const archive = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=invoice.pdf",
      });
      buildPDF(
        (data) => archive.write(data),
        () => archive.end()
      );
}