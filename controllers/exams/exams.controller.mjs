import "dotenv/config";
import { pool } from "../../index.mjs"
import { response } from "express";

//?GET ALL EXAMS exams.get("/", getExamsA1);

export const getExams = async (req, res) => {
    let conn;

    var exams = [
        {
          id: '12364268',
          name: 'Estar o hay',
          question: [
            {
              statement: '¿Dónde ______ una papelera? Necesito tirar este papel.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Hay"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Es"
                }
            ],
              id: '123642424268',
            },
            {
              statement:
                'Disculpe, ¿puede decirme dónde _____ la estación de metro más cercana?',
              responses: [
                {
                    id: "123123122176345323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "12367123122453245",
                    letter: "B",
                    response: "Hay"
                },
                {
                    id: "123128822233316722453245",
                    letter: "C",
                    response: "Es"
                }
                ],
                id: '1234464268',
            },
            {
              statement: 'En la esquina de la avenida ______ tres bancos.',
              responses: [
                {
                    id: "1231222131221345323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "123123122454123245",
                    letter: "B",
                    response: "Hay"
                },
                {
                    id: "12312882226333122453245",
                    letter: "C",
                    response: "Es"
                }
                ],
              id: '123642468',
            },
            {
              statement: 'Algunas personas de la clase ______ en el pasillo.',
              responses: [
                {
                    id: "123123125323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "12312122453245",
                    letter: "B",
                    response: "Hay"
                },
                {
                    id: "123128822233312243245",
                    letter: "C",
                    response: "Son"
                }
                ],
              id: '1236424344468',
            },
          ],
        },
        {
          id: '1236423443434868',
          name: 'Tener o haber',
          question: [
            {
              statement: 'En mi ciudad ______ muchas zonas verdes.',
              responses: [
                {
                    id: "123123122134532345345",
                    letter: "A",
                    response: "Hay"
                },
                {
                    id: "23123122453245",
                    letter: "B",
                    response: "Están"
                },
                {
                    id: "123128822233312243245",
                    letter: "C",
                    response: "Tienen"
                }
                ],
              id: '1236426858',
            },
            {
              statement: 'Mi barrio ______ varias floristerías.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Hay"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Tiene"
                }
                ],
              id: '12364654268',
            },
            {
              statement: 'Al final de la clase ______ un mapa y un perchero.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Tiene"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Hay"
                }
                ],
              id: '1236854268',
            },
            {
              statement: 'La tienda de ropa _______ dos probadores.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Gusta"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Encantan"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Intereso"
                }
                ],
              id: '12364875268',
            },
          ],
        },
        {
          id: '123648568268',
          name: 'Gustar y similares',
          question: [
            {
              statement: 'A mí me _______ los helados de chocolate.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Gusta"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Encantan"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Intereso"
                }
                ],
              id: '123685664268',
            },
            {
              statement: '¿Te ________ la cultura española?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Importan"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Gustan"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Interesa"
                }
                ],
              id: '123645365268',
            },
            {
              statement: 'A mi hermano le _______ hacer senderismo.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Gusta"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Prefiere"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Preocupo"
                }
                ],
              id: '1236453695268',
            },
            {
              statement: 'Nos _______ el flamenco y el tango.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Encantamos"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Preocupa"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "GUstan"
                }
                ],
              id: '1236425365236568',
            },
          ],
        },
        {
          id: '12364535898268',
          name: 'Presente irregular',
          question: [
            {
              statement:
                'Mientras tú preparas la comida, yo ______ la mesa, ¿vale?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Pono"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Pongo"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Pone"
                }
                ],
              id: '12368569856956954268',
            },
            {
              statement: 'Cuando yo _______, siempre escucho música.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Conduzo"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Conduco"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Conduzco"
                }
                ],
              id: '12364536565268',
            },
            {
              statement: '¿No _______ que la comida ecuatoriana es deliciosa?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Piensas"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Pensas"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Pensa"
                }
                ],
              id: '12356365264268',
            },
            {
              statement: 'Estamos buscando trabajo, pero no lo _______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Encuentramos"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Encontramos"
                },
                ],
              id: '1235236523664268',
            },
          ],
        },
        {
          id: '16523632364268',
          name: 'Descripción física',
          question: [
            {
              statement: 'Mi vecina Malena tiene el pelo ______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Rubia"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Rubio"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Larga"
                }
                ],
              id: '123642623652368',
            },
            {
              statement: 'Mi hermana y yo _______ los ojos marrones.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Tenemos"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Llevamos"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Somos"
                }
                ],
              id: '123642536523268',
            },
            {
              statement: 'Su abuelo no tiene pelo, es _______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Castaño"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Canoso"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Calvo"
                }
                ],
              id: '1236475463795268',
            },
            {
              statement: '¿Tú _______ gafas para leer solamente?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Tienes"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Llevas"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Eres"
                }
                ],
              id: '12364854635735354268',
            },
          ],
        },
        {
          id: '123646527856487268',
          name: 'Género y número',
          question: [
            {
              statement: 'Siempre lleva pantalones vaqueros ________, le encantan.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Corto"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Azul"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Azules"
                }
                ],
              id: '123687653689545434268',
            },
            {
              statement:
                'No me gusta el agua ________, no es bueno para la garganta.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Fría"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Frío"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Caliento"
                }
                ],
              id: '123648538954374562268',
            },
            {
              statement: 'En las fotos, las personas están _______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Feliz"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Felices"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Felizes"
                }
                ],
              id: '123854326543264268',
            },
            {
              statement: 'El planeta de la película es muy ______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Peligroso"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Segura"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Especiales"
                }
                ],
              id: '12366453464534268',
            },
          ],
        },
        {
          id: '1236446852983563268',
          name: 'Cantidad',
          question: [
            {
              statement: 'En mi país hay ______ gente.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Muchos"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Algunas"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Poca"
                }
                ],
              id: '12363453685365436534268',
            },
            {
              statement: 'En esta carretera, los domingos hay ________ coches.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Muchos"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Muy"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Algún"
                }
                ],
              id: '1236453653453451234268',
            },
            {
              statement: 'La calle donde vivo es _______ tranquila.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Mucho"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Muy"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Poca"
                }
                ],
              id: '123453453543425231364521364268',
            },
            {
              statement: 'No hay ______ farmacia cerca de mi casa.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Alguna"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Ninguna"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Mucha"
                }
                ],
              id: '123435555555555555555555555564268',
            },
          ],
        },
        {
          id: '1236444444444444444446268',
          name: 'Reflexivos',
          question: [
            {
              statement:
                'Todos los días _______ temprano, a las siete de la mañana.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Despierto"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Me despierto"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Desperto"
                }
                ],
              id: '12345633333333645464268',
            },
            {
              statement: 'La niña ya _______ sola, no necesita ayuda.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Se viste"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Se veste"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "VIste"
                }
                ],
              id: '12368767537453784268',
            },
            {
              statement: '¿A qué hora _______ vosotros los sábados?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Acostáis"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Os acostáis"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Acuetáis"
                }
                ],
              id: '1278625462364268',
            },
            {
              statement: '¿Tú _______ los dientes tres veces al día?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Cepillas"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Laves"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Te cepillas"
                }
                ],
              id: '123687654278453278544268',
            },
          ],
        },
        {
          id: '123678546327845375434268',
          name: 'Ropa',
          question: [
            {
              statement:
                'Voy a viajar por el norte y llueve mucho, necesito un _______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Chubaquero"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Sombrero"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Chándal"
                }
                ],
              id: '12362543754237452364268',
            },
            {
              statement: 'Si no me pongo los _______, tengo las manos heladas.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Calcetines"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Vaqueros"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Guantes"
                }
                ],
              id: '1236478546328965432854324268',
            },
            {
              statement: 'Quiero comprarme un _______ para nadar.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Bañador"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Traje"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Polo"
                }
                ],
              id: '123674563986543784514268',
            },
            {
              statement: 'Carmela prefiere llevar ______ que pantalones.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Corbata"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Chaqueta"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Falda"
                }
                ],
              id: '12369563965322484268',
            },
          ],
        },
        {
          id: '123642688686868',
          name: 'Tiempo atmosférico',
          question: [
            {
              statement: 'En junio no _______ frío, no necesitas abrigo.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Es"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Hace"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Está"
                }
                ],
              id: '12368',
            },
            {
              statement: 'Hoy hace un día malo, _______ nublado.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Está"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Es"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Hace"
                }
                ],
              id: '4268',
            },
            {
              statement: 'En invierno ______ mucho.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Lluvia"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Llueve"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Llove"
                }
                ],
              id: '12353535353535268',
            },
            {
              statement:
                'Mi estación favorita es el ______, porque los árboles están amarillos y rojos.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Otoño"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Verano"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Primavera"
                }
                ],
              id: '12785453364268',
            },
          ],
        },
        {
          id: '123687452875462784562785434268',
          name: 'Pretérito perfecto',
          question: [
            {
              statement: 'Esta mañana mis amigos y yo _____ un vídeo.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Hemos hacido"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Hamos hecho"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Hemos hecho"
                }
                ],
              id: '1237865375437254375464268',
            },
            {
              statement: '¿Todavía no ______ la película?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Hais visto"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Habéis visto"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Habéis vida"
                }
                ],
              id: '12378456728567864268',
            },
            {
              statement: 'El niño ______ el juguete hoy.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Has roto"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "He rompido"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Ha roto"
                }
                ],
              id: '12387666666666678564268',
            },
            {
              statement: '¿Alguna vez tú ______ un mensaje en español?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Has escrito"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Has escribió"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "He escrito"
                }
                ],
              id: '12788888862364268',
            },
          ],
        },
        {
          id: '12364876567685278665268',
          name: 'Pronombres OD y OI gustar',
          question: [
            {
              statement: 'La verdura, ¿cómo _____ preparas?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "La"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Lo"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Las"
                }
                ],
              id: '12378628756278687542764268',
            },
            {
              statement: 'A Martín _____ encanta este blog de viajes.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Lo"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Le"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Te"
                }
                ],
              id: '123687687527854628754268',
            },
            {
              statement: 'Los huevos _____ pongo en la nevera.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Los"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Les"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Me"
                }
                ],
              id: '1238287272728728728728764268',
            },
            {
              statement: 'A mis primas _______ apasiona la montaña.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Os"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Les"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Las"
                }
                ],
              id: '12368678686876868684268',
            },
          ],
        },
        {
          id: '123268',
          name: 'Preposiciones',
          question: [
            {
              statement: 'Este fin de semana nos vamos _____ excursión.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "A la"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Al"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "De"
                }
                ],
              id: '123456767676767676764268',
            },
            {
              statement: 'Aquella catarata es la más alta ____ país.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Del"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "De"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "En"
                }
                ],
              id: '17676676767676762364268',
            },
            {
              statement: '¿Echas de menos _______ tu familia?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "De"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Sin preposición"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "A"
                }
                ],
              id: '123642687666767676767',
            },
            {
              statement: 'Elena nunca ha ido _______ exposición.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "A un"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "A una"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "De"
                }
                ],
              id: '12376767667564268',
            },
          ],
        },
        {
          id: '123642677171717171117168',
          name: 'Vocabulario',
          question: [
            {
              statement: '¿Me trae, por favor, una ______ para comer la sopa?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Cuchillo"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Tenedor"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Cuchara"
                }
                ],
              id: '122888282828282828282364268',
            },
            {
              statement:
                'Voy a ir a la playa y quiero llevarme una camiseta de _______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Manga larga"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Tirantes"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Cuadros"
                }
                ],
              id: '12363939393939393934268',
            },
            {
              statement:
                'Su tío pone todas las cosas en su lugar. Es muy ________.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Despistado"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Organizado"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Abierto"
                }
                ],
              id: '123643838383838388383268',
            },
            {
              statement:
                'Su barrio tiene mucha vida nocturna, todas las noches hay gente, es muy _______.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Barato"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Feo"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Ruidosa"
                }
                ],
              id: '12364238228215483568',
            },
          ],
        },
        {
          id: '12371185858558585858564268',
          name: 'Variadas de gramática',
          question: [
            {
              statement: '_______ desierto es el más grande del mundo.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Esto"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Este"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Esta"
                }
                ],
              id: '1236426744747474747474748',
            },
            {
              statement: '¿ ________ son las castañuelas? ¿Un instrumento musical?',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Cuál"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Cuáles"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Qué"
                }
                ],
              id: '1236427474747474747474747474768',
            },
            {
              statement: 'Leandro tiene dos cuñadas. ______ cuñadas son de México.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "Su"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Sus"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Suyas"
                }
                ],
              id: '12364286866969698568',
            },
            {
              statement: 'La heladería está ________ taller.',
              responses: [
                {
                    id: "1231231221345323453245",
                    letter: "A",
                    response: "A la derecha"
                },
                {
                    id: "123123122453245",
                    letter: "B",
                    response: "Al lado del"
                },
                {
                    id: "1231288222333122453245",
                    letter: "C",
                    response: "Cerca"
                }
                ],
              id: '12364587447554757575268',
            },
          ],
        },
      ];

    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from alumnos");
        res.json(exams);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

//? ADD QUESTIONS

export const postQuestions = async (req, res) => {
  let conn;
  var exams = [
    {
      id: '12364268',
      name: 'Estar o hay',
      question: [
        {
          statement: '¿Dónde ______ una papelera? Necesito tirar este papel.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Es"
            }
        ],
          id: '123642424268',
        },
        {
          statement:
            'Disculpe, ¿puede decirme dónde _____ la estación de metro más cercana?',
          responses: [
            {
                id: "123123122176345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "12367123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "123128822233316722453245",
                letter: "C",
                response: "Es"
            }
            ],
            id: '1234464268',
        },
        {
          statement: 'En la esquina de la avenida ______ tres bancos.',
          responses: [
            {
                id: "1231222131221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122454123245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "12312882226333122453245",
                letter: "C",
                response: "Es"
            }
            ],
          id: '123642468',
        },
        {
          statement: 'Algunas personas de la clase ______ en el pasillo.',
          responses: [
            {
                id: "123123125323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "12312122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "123128822233312243245",
                letter: "C",
                response: "Son"
            }
            ],
          id: '1236424344468',
        },
      ],
    },
    {
      id: '1236423443434868',
      name: 'Tener o haber',
      question: [
        {
          statement: 'En mi ciudad ______ muchas zonas verdes.',
          responses: [
            {
                id: "123123122134532345345",
                letter: "A",
                response: "Hay"
            },
            {
                id: "23123122453245",
                letter: "B",
                response: "Están"
            },
            {
                id: "123128822233312243245",
                letter: "C",
                response: "Tienen"
            }
            ],
          id: '1236426858',
        },
        {
          statement: 'Mi barrio ______ varias floristerías.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Tiene"
            }
            ],
          id: '12364654268',
        },
        {
          statement: 'Al final de la clase ______ un mapa y un perchero.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tiene"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hay"
            }
            ],
          id: '1236854268',
        },
        {
          statement: 'La tienda de ropa _______ dos probadores.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encantan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Intereso"
            }
            ],
          id: '12364875268',
        },
      ],
    },
    {
      id: '123648568268',
      name: 'Gustar y similares',
      question: [
        {
          statement: 'A mí me _______ los helados de chocolate.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encantan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Intereso"
            }
            ],
          id: '123685664268',
        },
        {
          statement: '¿Te ________ la cultura española?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Importan"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Gustan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Interesa"
            }
            ],
          id: '123645365268',
        },
        {
          statement: 'A mi hermano le _______ hacer senderismo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Prefiere"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Preocupo"
            }
            ],
          id: '1236453695268',
        },
        {
          statement: 'Nos _______ el flamenco y el tango.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Encantamos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Preocupa"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "GUstan"
            }
            ],
          id: '1236425365236568',
        },
      ],
    },
    {
      id: '12364535898268',
      name: 'Presente irregular',
      question: [
        {
          statement:
            'Mientras tú preparas la comida, yo ______ la mesa, ¿vale?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Pono"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Pongo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Pone"
            }
            ],
          id: '12368569856956954268',
        },
        {
          statement: 'Cuando yo _______, siempre escucho música.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Conduzo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Conduco"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Conduzco"
            }
            ],
          id: '12364536565268',
        },
        {
          statement: '¿No _______ que la comida ecuatoriana es deliciosa?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Piensas"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Pensas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Pensa"
            }
            ],
          id: '12356365264268',
        },
        {
          statement: 'Estamos buscando trabajo, pero no lo _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Encuentramos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encontramos"
            },
            ],
          id: '1235236523664268',
        },
      ],
    },
    {
      id: '16523632364268',
      name: 'Descripción física',
      question: [
        {
          statement: 'Mi vecina Malena tiene el pelo ______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Rubia"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Rubio"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Larga"
            }
            ],
          id: '123642623652368',
        },
        {
          statement: 'Mi hermana y yo _______ los ojos marrones.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Tenemos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llevamos"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Somos"
            }
            ],
          id: '123642536523268',
        },
        {
          statement: 'Su abuelo no tiene pelo, es _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Castaño"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Canoso"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Calvo"
            }
            ],
          id: '1236475463795268',
        },
        {
          statement: '¿Tú _______ gafas para leer solamente?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Tienes"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llevas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Eres"
            }
            ],
          id: '12364854635735354268',
        },
      ],
    },
    {
      id: '123646527856487268',
      name: 'Género y número',
      question: [
        {
          statement: 'Siempre lleva pantalones vaqueros ________, le encantan.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Corto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Azul"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Azules"
            }
            ],
          id: '123687653689545434268',
        },
        {
          statement:
            'No me gusta el agua ________, no es bueno para la garganta.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Fría"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Frío"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Caliento"
            }
            ],
          id: '123648538954374562268',
        },
        {
          statement: 'En las fotos, las personas están _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Feliz"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Felices"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Felizes"
            }
            ],
          id: '123854326543264268',
        },
        {
          statement: 'El planeta de la película es muy ______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Peligroso"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Segura"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Especiales"
            }
            ],
          id: '12366453464534268',
        },
      ],
    },
    {
      id: '1236446852983563268',
      name: 'Cantidad',
      question: [
        {
          statement: 'En mi país hay ______ gente.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Muchos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Algunas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Poca"
            }
            ],
          id: '12363453685365436534268',
        },
        {
          statement: 'En esta carretera, los domingos hay ________ coches.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Muchos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Muy"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Algún"
            }
            ],
          id: '1236453653453451234268',
        },
        {
          statement: 'La calle donde vivo es _______ tranquila.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Mucho"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Muy"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Poca"
            }
            ],
          id: '123453453543425231364521364268',
        },
        {
          statement: 'No hay ______ farmacia cerca de mi casa.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Alguna"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Ninguna"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Mucha"
            }
            ],
          id: '123435555555555555555555555564268',
        },
      ],
    },
    {
      id: '1236444444444444444446268',
      name: 'Reflexivos',
      question: [
        {
          statement:
            'Todos los días _______ temprano, a las siete de la mañana.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Despierto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Me despierto"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Desperto"
            }
            ],
          id: '12345633333333645464268',
        },
        {
          statement: 'La niña ya _______ sola, no necesita ayuda.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Se viste"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Se veste"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "VIste"
            }
            ],
          id: '12368767537453784268',
        },
        {
          statement: '¿A qué hora _______ vosotros los sábados?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Acostáis"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Os acostáis"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Acuetáis"
            }
            ],
          id: '1278625462364268',
        },
        {
          statement: '¿Tú _______ los dientes tres veces al día?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cepillas"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Laves"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Te cepillas"
            }
            ],
          id: '123687654278453278544268',
        },
      ],
    },
    {
      id: '123678546327845375434268',
      name: 'Ropa',
      question: [
        {
          statement:
            'Voy a viajar por el norte y llueve mucho, necesito un _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Chubaquero"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sombrero"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Chándal"
            }
            ],
          id: '12362543754237452364268',
        },
        {
          statement: 'Si no me pongo los _______, tengo las manos heladas.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Calcetines"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Vaqueros"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Guantes"
            }
            ],
          id: '1236478546328965432854324268',
        },
        {
          statement: 'Quiero comprarme un _______ para nadar.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Bañador"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Traje"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Polo"
            }
            ],
          id: '123674563986543784514268',
        },
        {
          statement: 'Carmela prefiere llevar ______ que pantalones.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Corbata"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Chaqueta"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Falda"
            }
            ],
          id: '12369563965322484268',
        },
      ],
    },
    {
      id: '123642688686868',
      name: 'Tiempo atmosférico',
      question: [
        {
          statement: 'En junio no _______ frío, no necesitas abrigo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Es"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hace"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Está"
            }
            ],
          id: '12368',
        },
        {
          statement: 'Hoy hace un día malo, _______ nublado.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Es"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hace"
            }
            ],
          id: '4268',
        },
        {
          statement: 'En invierno ______ mucho.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Lluvia"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llueve"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Llove"
            }
            ],
          id: '12353535353535268',
        },
        {
          statement:
            'Mi estación favorita es el ______, porque los árboles están amarillos y rojos.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Otoño"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Verano"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Primavera"
            }
            ],
          id: '12785453364268',
        },
      ],
    },
    {
      id: '123687452875462784562785434268',
      name: 'Pretérito perfecto',
      question: [
        {
          statement: 'Esta mañana mis amigos y yo _____ un vídeo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Hemos hacido"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hamos hecho"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hemos hecho"
            }
            ],
          id: '1237865375437254375464268',
        },
        {
          statement: '¿Todavía no ______ la película?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Hais visto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Habéis visto"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Habéis vida"
            }
            ],
          id: '12378456728567864268',
        },
        {
          statement: 'El niño ______ el juguete hoy.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Has roto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "He rompido"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Ha roto"
            }
            ],
          id: '12387666666666678564268',
        },
        {
          statement: '¿Alguna vez tú ______ un mensaje en español?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Has escrito"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Has escribió"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "He escrito"
            }
            ],
          id: '12788888862364268',
        },
      ],
    },
    {
      id: '12364876567685278665268',
      name: 'Pronombres OD y OI gustar',
      question: [
        {
          statement: 'La verdura, ¿cómo _____ preparas?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "La"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Lo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Las"
            }
            ],
          id: '12378628756278687542764268',
        },
        {
          statement: 'A Martín _____ encanta este blog de viajes.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Lo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Le"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Te"
            }
            ],
          id: '123687687527854628754268',
        },
        {
          statement: 'Los huevos _____ pongo en la nevera.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Los"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Les"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Me"
            }
            ],
          id: '1238287272728728728728764268',
        },
        {
          statement: 'A mis primas _______ apasiona la montaña.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Os"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Les"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Las"
            }
            ],
          id: '12368678686876868684268',
        },
      ],
    },
    {
      id: '123268',
      name: 'Preposiciones',
      question: [
        {
          statement: 'Este fin de semana nos vamos _____ excursión.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A la"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Al"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "De"
            }
            ],
          id: '123456767676767676764268',
        },
        {
          statement: 'Aquella catarata es la más alta ____ país.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Del"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "De"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "En"
            }
            ],
          id: '17676676767676762364268',
        },
        {
          statement: '¿Echas de menos _______ tu familia?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "De"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sin preposición"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "A"
            }
            ],
          id: '123642687666767676767',
        },
        {
          statement: 'Elena nunca ha ido _______ exposición.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A un"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "A una"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "De"
            }
            ],
          id: '12376767667564268',
        },
      ],
    },
    {
      id: '123642677171717171117168',
      name: 'Vocabulario',
      question: [
        {
          statement: '¿Me trae, por favor, una ______ para comer la sopa?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cuchillo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tenedor"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cuchara"
            }
            ],
          id: '122888282828282828282364268',
        },
        {
          statement:
            'Voy a ir a la playa y quiero llevarme una camiseta de _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Manga larga"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tirantes"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cuadros"
            }
            ],
          id: '12363939393939393934268',
        },
        {
          statement:
            'Su tío pone todas las cosas en su lugar. Es muy ________.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Despistado"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Organizado"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Abierto"
            }
            ],
          id: '123643838383838388383268',
        },
        {
          statement:
            'Su barrio tiene mucha vida nocturna, todas las noches hay gente, es muy _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Barato"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Feo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Ruidosa"
            }
            ],
          id: '12364238228215483568',
        },
      ],
    },
    {
      id: '12371185858558585858564268',
      name: 'Variadas de gramática',
      question: [
        {
          statement: '_______ desierto es el más grande del mundo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Esto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Este"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Esta"
            }
            ],
          id: '1236426744747474747474748',
        },
        {
          statement: '¿ ________ son las castañuelas? ¿Un instrumento musical?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cuál"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Cuáles"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Qué"
            }
            ],
          id: '1236427474747474747474747474768',
        },
        {
          statement: 'Leandro tiene dos cuñadas. ______ cuñadas son de México.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Su"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sus"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Suyas"
            }
            ],
          id: '12364286866969698568',
        },
        {
          statement: 'La heladería está ________ taller.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A la derecha"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Al lado del"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cerca"
            }
            ],
          id: '12364587447554757575268',
        },
      ],
    },
  ];
  try {
    conn = await pool.getConnection();
    let rows = await conn.query("select * from accommodation");
      let add = {
        statement: req.body.question,
        responses: [
          {
            letter: "A",
            response: req.body.responseA
          },
          {
            letter: "B",
            response: req.body.responseB
          },
        ]
      }

      if(req.body.responseC){
        add.responses.push({letter: "C", response: req.body.responseC})
      }
      if(req.body.responseD){
        add.responses.push({letter: "D", response: req.body.responseD})
      }
      if(req.body.responseE){
        add.responses.push({letter: "E", response: req.body.responseE})
      }

      for(let i = 0; exams.length > i; i++){
        if(exams[i].name === req.body.block){
          exams[i].question.push(add)
        }
      }

    console.log(exams[0].question.responses);

    res.json(add)
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) return conn.end();
  }
};

//? DELETE QUESTIONS

export const deleteQuestions = async (req, res) => {
  let conn;
  let exams = [
    {
      id: '12364268',
      name: 'Estar o hay',
      question: [
        {
          statement: '¿Dónde ______ una papelera? Necesito tirar este papel.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Es"
            }
        ],
          id: '123642424268',
        },
        {
          statement:
            'Disculpe, ¿puede decirme dónde _____ la estación de metro más cercana?',
          responses: [
            {
                id: "123123122176345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "12367123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "123128822233316722453245",
                letter: "C",
                response: "Es"
            }
            ],
            id: '1234464268',
        },
        {
          statement: 'En la esquina de la avenida ______ tres bancos.',
          responses: [
            {
                id: "1231222131221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122454123245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "12312882226333122453245",
                letter: "C",
                response: "Es"
            }
            ],
          id: '123642468',
        },
        {
          statement: 'Algunas personas de la clase ______ en el pasillo.',
          responses: [
            {
                id: "123123125323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "12312122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "123128822233312243245",
                letter: "C",
                response: "Son"
            }
            ],
          id: '1236424344468',
        },
      ],
    },
    {
      id: '1236423443434868',
      name: 'Tener o haber',
      question: [
        {
          statement: 'En mi ciudad ______ muchas zonas verdes.',
          responses: [
            {
                id: "123123122134532345345",
                letter: "A",
                response: "Hay"
            },
            {
                id: "23123122453245",
                letter: "B",
                response: "Están"
            },
            {
                id: "123128822233312243245",
                letter: "C",
                response: "Tienen"
            }
            ],
          id: '1236426858',
        },
        {
          statement: 'Mi barrio ______ varias floristerías.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Tiene"
            }
            ],
          id: '12364654268',
        },
        {
          statement: 'Al final de la clase ______ un mapa y un perchero.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tiene"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hay"
            }
            ],
          id: '1236854268',
        },
        {
          statement: 'La tienda de ropa _______ dos probadores.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encantan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Intereso"
            }
            ],
          id: '12364875268',
        },
      ],
    },
    {
      id: '123648568268',
      name: 'Gustar y similares',
      question: [
        {
          statement: 'A mí me _______ los helados de chocolate.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encantan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Intereso"
            }
            ],
          id: '123685664268',
        },
        {
          statement: '¿Te ________ la cultura española?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Importan"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Gustan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Interesa"
            }
            ],
          id: '123645365268',
        },
        {
          statement: 'A mi hermano le _______ hacer senderismo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Prefiere"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Preocupo"
            }
            ],
          id: '1236453695268',
        },
        {
          statement: 'Nos _______ el flamenco y el tango.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Encantamos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Preocupa"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "GUstan"
            }
            ],
          id: '1236425365236568',
        },
      ],
    },
    {
      id: '12364535898268',
      name: 'Presente irregular',
      question: [
        {
          statement:
            'Mientras tú preparas la comida, yo ______ la mesa, ¿vale?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Pono"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Pongo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Pone"
            }
            ],
          id: '12368569856956954268',
        },
        {
          statement: 'Cuando yo _______, siempre escucho música.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Conduzo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Conduco"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Conduzco"
            }
            ],
          id: '12364536565268',
        },
        {
          statement: '¿No _______ que la comida ecuatoriana es deliciosa?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Piensas"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Pensas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Pensa"
            }
            ],
          id: '12356365264268',
        },
        {
          statement: 'Estamos buscando trabajo, pero no lo _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Encuentramos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encontramos"
            },
            ],
          id: '1235236523664268',
        },
      ],
    },
    {
      id: '16523632364268',
      name: 'Descripción física',
      question: [
        {
          statement: 'Mi vecina Malena tiene el pelo ______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Rubia"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Rubio"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Larga"
            }
            ],
          id: '123642623652368',
        },
        {
          statement: 'Mi hermana y yo _______ los ojos marrones.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Tenemos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llevamos"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Somos"
            }
            ],
          id: '123642536523268',
        },
        {
          statement: 'Su abuelo no tiene pelo, es _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Castaño"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Canoso"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Calvo"
            }
            ],
          id: '1236475463795268',
        },
        {
          statement: '¿Tú _______ gafas para leer solamente?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Tienes"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llevas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Eres"
            }
            ],
          id: '12364854635735354268',
        },
      ],
    },
    {
      id: '123646527856487268',
      name: 'Género y número',
      question: [
        {
          statement: 'Siempre lleva pantalones vaqueros ________, le encantan.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Corto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Azul"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Azules"
            }
            ],
          id: '123687653689545434268',
        },
        {
          statement:
            'No me gusta el agua ________, no es bueno para la garganta.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Fría"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Frío"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Caliento"
            }
            ],
          id: '123648538954374562268',
        },
        {
          statement: 'En las fotos, las personas están _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Feliz"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Felices"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Felizes"
            }
            ],
          id: '123854326543264268',
        },
        {
          statement: 'El planeta de la película es muy ______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Peligroso"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Segura"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Especiales"
            }
            ],
          id: '12366453464534268',
        },
      ],
    },
    {
      id: '1236446852983563268',
      name: 'Cantidad',
      question: [
        {
          statement: 'En mi país hay ______ gente.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Muchos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Algunas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Poca"
            }
            ],
          id: '12363453685365436534268',
        },
        {
          statement: 'En esta carretera, los domingos hay ________ coches.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Muchos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Muy"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Algún"
            }
            ],
          id: '1236453653453451234268',
        },
        {
          statement: 'La calle donde vivo es _______ tranquila.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Mucho"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Muy"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Poca"
            }
            ],
          id: '123453453543425231364521364268',
        },
        {
          statement: 'No hay ______ farmacia cerca de mi casa.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Alguna"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Ninguna"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Mucha"
            }
            ],
          id: '123435555555555555555555555564268',
        },
      ],
    },
    {
      id: '1236444444444444444446268',
      name: 'Reflexivos',
      question: [
        {
          statement:
            'Todos los días _______ temprano, a las siete de la mañana.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Despierto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Me despierto"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Desperto"
            }
            ],
          id: '12345633333333645464268',
        },
        {
          statement: 'La niña ya _______ sola, no necesita ayuda.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Se viste"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Se veste"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "VIste"
            }
            ],
          id: '12368767537453784268',
        },
        {
          statement: '¿A qué hora _______ vosotros los sábados?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Acostáis"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Os acostáis"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Acuetáis"
            }
            ],
          id: '1278625462364268',
        },
        {
          statement: '¿Tú _______ los dientes tres veces al día?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cepillas"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Laves"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Te cepillas"
            }
            ],
          id: '123687654278453278544268',
        },
      ],
    },
    {
      id: '123678546327845375434268',
      name: 'Ropa',
      question: [
        {
          statement:
            'Voy a viajar por el norte y llueve mucho, necesito un _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Chubaquero"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sombrero"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Chándal"
            }
            ],
          id: '12362543754237452364268',
        },
        {
          statement: 'Si no me pongo los _______, tengo las manos heladas.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Calcetines"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Vaqueros"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Guantes"
            }
            ],
          id: '1236478546328965432854324268',
        },
        {
          statement: 'Quiero comprarme un _______ para nadar.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Bañador"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Traje"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Polo"
            }
            ],
          id: '123674563986543784514268',
        },
        {
          statement: 'Carmela prefiere llevar ______ que pantalones.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Corbata"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Chaqueta"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Falda"
            }
            ],
          id: '12369563965322484268',
        },
      ],
    },
    {
      id: '123642688686868',
      name: 'Tiempo atmosférico',
      question: [
        {
          statement: 'En junio no _______ frío, no necesitas abrigo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Es"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hace"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Está"
            }
            ],
          id: '12368',
        },
        {
          statement: 'Hoy hace un día malo, _______ nublado.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Es"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hace"
            }
            ],
          id: '4268',
        },
        {
          statement: 'En invierno ______ mucho.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Lluvia"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llueve"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Llove"
            }
            ],
          id: '12353535353535268',
        },
        {
          statement:
            'Mi estación favorita es el ______, porque los árboles están amarillos y rojos.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Otoño"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Verano"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Primavera"
            }
            ],
          id: '12785453364268',
        },
      ],
    },
    {
      id: '123687452875462784562785434268',
      name: 'Pretérito perfecto',
      question: [
        {
          statement: 'Esta mañana mis amigos y yo _____ un vídeo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Hemos hacido"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hamos hecho"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hemos hecho"
            }
            ],
          id: '1237865375437254375464268',
        },
        {
          statement: '¿Todavía no ______ la película?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Hais visto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Habéis visto"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Habéis vida"
            }
            ],
          id: '12378456728567864268',
        },
        {
          statement: 'El niño ______ el juguete hoy.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Has roto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "He rompido"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Ha roto"
            }
            ],
          id: '12387666666666678564268',
        },
        {
          statement: '¿Alguna vez tú ______ un mensaje en español?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Has escrito"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Has escribió"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "He escrito"
            }
            ],
          id: '12788888862364268',
        },
      ],
    },
    {
      id: '12364876567685278665268',
      name: 'Pronombres OD y OI gustar',
      question: [
        {
          statement: 'La verdura, ¿cómo _____ preparas?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "La"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Lo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Las"
            }
            ],
          id: '12378628756278687542764268',
        },
        {
          statement: 'A Martín _____ encanta este blog de viajes.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Lo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Le"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Te"
            }
            ],
          id: '123687687527854628754268',
        },
        {
          statement: 'Los huevos _____ pongo en la nevera.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Los"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Les"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Me"
            }
            ],
          id: '1238287272728728728728764268',
        },
        {
          statement: 'A mis primas _______ apasiona la montaña.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Os"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Les"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Las"
            }
            ],
          id: '12368678686876868684268',
        },
      ],
    },
    {
      id: '123268',
      name: 'Preposiciones',
      question: [
        {
          statement: 'Este fin de semana nos vamos _____ excursión.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A la"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Al"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "De"
            }
            ],
          id: '123456767676767676764268',
        },
        {
          statement: 'Aquella catarata es la más alta ____ país.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Del"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "De"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "En"
            }
            ],
          id: '17676676767676762364268',
        },
        {
          statement: '¿Echas de menos _______ tu familia?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "De"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sin preposición"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "A"
            }
            ],
          id: '123642687666767676767',
        },
        {
          statement: 'Elena nunca ha ido _______ exposición.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A un"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "A una"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "De"
            }
            ],
          id: '12376767667564268',
        },
      ],
    },
    {
      id: '123642677171717171117168',
      name: 'Vocabulario',
      question: [
        {
          statement: '¿Me trae, por favor, una ______ para comer la sopa?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cuchillo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tenedor"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cuchara"
            }
            ],
          id: '122888282828282828282364268',
        },
        {
          statement:
            'Voy a ir a la playa y quiero llevarme una camiseta de _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Manga larga"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tirantes"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cuadros"
            }
            ],
          id: '12363939393939393934268',
        },
        {
          statement:
            'Su tío pone todas las cosas en su lugar. Es muy ________.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Despistado"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Organizado"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Abierto"
            }
            ],
          id: '123643838383838388383268',
        },
        {
          statement:
            'Su barrio tiene mucha vida nocturna, todas las noches hay gente, es muy _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Barato"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Feo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Ruidosa"
            }
            ],
          id: '12364238228215483568',
        },
      ],
    },
    {
      id: '12371185858558585858564268',
      name: 'Variadas de gramática',
      question: [
        {
          statement: '_______ desierto es el más grande del mundo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Esto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Este"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Esta"
            }
            ],
          id: '1236426744747474747474748',
        },
        {
          statement: '¿ ________ son las castañuelas? ¿Un instrumento musical?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cuál"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Cuáles"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Qué"
            }
            ],
          id: '1236427474747474747474747474768',
        },
        {
          statement: 'Leandro tiene dos cuñadas. ______ cuñadas son de México.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Su"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sus"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Suyas"
            }
            ],
          id: '12364286866969698568',
        },
        {
          statement: 'La heladería está ________ taller.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A la derecha"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Al lado del"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cerca"
            }
            ],
          id: '12364587447554757575268',
        },
      ],
    },
  ];

  try {
    conn = await pool.getConnection();
    let rows = await conn.query("select * from accommodation");

    let block = 0;
    let numberQuestion = 0;

    for(let i = 0; exams.length > i; i++){
      if(exams[i].name === req.body.exam.name){
        block = i;
        for(let x = 0; exams[i].question.length > x; x++){
      
          if(exams[i].question[x].statement && exams[i].question[x].statement === req.body.question.statement){
          
            numberQuestion = x;
          };
        }
      };
    };

    exams[block].question.splice(numberQuestion, 1);

    res.json(exams)
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) return conn.end();
  }
};

//? EDIT QUESTIONS

export const editQuestions = async (req, res) => {
  let conn;
  let exams = [
    {
      id: '12364268',
      name: 'Estar o hay',
      question: [
        {
          statement: '¿Dónde ______ una papelera? Necesito tirar este papel.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Es"
            }
        ],
          id: '123642424268',
        },
        {
          statement:
            'Disculpe, ¿puede decirme dónde _____ la estación de metro más cercana?',
          responses: [
            {
                id: "123123122176345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "12367123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "123128822233316722453245",
                letter: "C",
                response: "Es"
            }
            ],
            id: '1234464268',
        },
        {
          statement: 'En la esquina de la avenida ______ tres bancos.',
          responses: [
            {
                id: "1231222131221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122454123245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "12312882226333122453245",
                letter: "C",
                response: "Es"
            }
            ],
          id: '123642468',
        },
        {
          statement: 'Algunas personas de la clase ______ en el pasillo.',
          responses: [
            {
                id: "123123125323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "12312122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "123128822233312243245",
                letter: "C",
                response: "Son"
            }
            ],
          id: '1236424344468',
        },
      ],
    },
    {
      id: '1236423443434868',
      name: 'Tener o haber',
      question: [
        {
          statement: 'En mi ciudad ______ muchas zonas verdes.',
          responses: [
            {
                id: "123123122134532345345",
                letter: "A",
                response: "Hay"
            },
            {
                id: "23123122453245",
                letter: "B",
                response: "Están"
            },
            {
                id: "123128822233312243245",
                letter: "C",
                response: "Tienen"
            }
            ],
          id: '1236426858',
        },
        {
          statement: 'Mi barrio ______ varias floristerías.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hay"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Tiene"
            }
            ],
          id: '12364654268',
        },
        {
          statement: 'Al final de la clase ______ un mapa y un perchero.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tiene"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hay"
            }
            ],
          id: '1236854268',
        },
        {
          statement: 'La tienda de ropa _______ dos probadores.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encantan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Intereso"
            }
            ],
          id: '12364875268',
        },
      ],
    },
    {
      id: '123648568268',
      name: 'Gustar y similares',
      question: [
        {
          statement: 'A mí me _______ los helados de chocolate.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encantan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Intereso"
            }
            ],
          id: '123685664268',
        },
        {
          statement: '¿Te ________ la cultura española?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Importan"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Gustan"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Interesa"
            }
            ],
          id: '123645365268',
        },
        {
          statement: 'A mi hermano le _______ hacer senderismo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Gusta"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Prefiere"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Preocupo"
            }
            ],
          id: '1236453695268',
        },
        {
          statement: 'Nos _______ el flamenco y el tango.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Encantamos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Preocupa"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "GUstan"
            }
            ],
          id: '1236425365236568',
        },
      ],
    },
    {
      id: '12364535898268',
      name: 'Presente irregular',
      question: [
        {
          statement:
            'Mientras tú preparas la comida, yo ______ la mesa, ¿vale?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Pono"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Pongo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Pone"
            }
            ],
          id: '12368569856956954268',
        },
        {
          statement: 'Cuando yo _______, siempre escucho música.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Conduzo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Conduco"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Conduzco"
            }
            ],
          id: '12364536565268',
        },
        {
          statement: '¿No _______ que la comida ecuatoriana es deliciosa?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Piensas"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Pensas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Pensa"
            }
            ],
          id: '12356365264268',
        },
        {
          statement: 'Estamos buscando trabajo, pero no lo _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Encuentramos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Encontramos"
            },
            ],
          id: '1235236523664268',
        },
      ],
    },
    {
      id: '16523632364268',
      name: 'Descripción física',
      question: [
        {
          statement: 'Mi vecina Malena tiene el pelo ______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Rubia"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Rubio"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Larga"
            }
            ],
          id: '123642623652368',
        },
        {
          statement: 'Mi hermana y yo _______ los ojos marrones.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Tenemos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llevamos"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Somos"
            }
            ],
          id: '123642536523268',
        },
        {
          statement: 'Su abuelo no tiene pelo, es _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Castaño"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Canoso"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Calvo"
            }
            ],
          id: '1236475463795268',
        },
        {
          statement: '¿Tú _______ gafas para leer solamente?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Tienes"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llevas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Eres"
            }
            ],
          id: '12364854635735354268',
        },
      ],
    },
    {
      id: '123646527856487268',
      name: 'Género y número',
      question: [
        {
          statement: 'Siempre lleva pantalones vaqueros ________, le encantan.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Corto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Azul"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Azules"
            }
            ],
          id: '123687653689545434268',
        },
        {
          statement:
            'No me gusta el agua ________, no es bueno para la garganta.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Fría"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Frío"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Caliento"
            }
            ],
          id: '123648538954374562268',
        },
        {
          statement: 'En las fotos, las personas están _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Feliz"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Felices"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Felizes"
            }
            ],
          id: '123854326543264268',
        },
        {
          statement: 'El planeta de la película es muy ______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Peligroso"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Segura"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Especiales"
            }
            ],
          id: '12366453464534268',
        },
      ],
    },
    {
      id: '1236446852983563268',
      name: 'Cantidad',
      question: [
        {
          statement: 'En mi país hay ______ gente.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Muchos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Algunas"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Poca"
            }
            ],
          id: '12363453685365436534268',
        },
        {
          statement: 'En esta carretera, los domingos hay ________ coches.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Muchos"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Muy"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Algún"
            }
            ],
          id: '1236453653453451234268',
        },
        {
          statement: 'La calle donde vivo es _______ tranquila.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Mucho"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Muy"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Poca"
            }
            ],
          id: '123453453543425231364521364268',
        },
        {
          statement: 'No hay ______ farmacia cerca de mi casa.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Alguna"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Ninguna"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Mucha"
            }
            ],
          id: '123435555555555555555555555564268',
        },
      ],
    },
    {
      id: '1236444444444444444446268',
      name: 'Reflexivos',
      question: [
        {
          statement:
            'Todos los días _______ temprano, a las siete de la mañana.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Despierto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Me despierto"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Desperto"
            }
            ],
          id: '12345633333333645464268',
        },
        {
          statement: 'La niña ya _______ sola, no necesita ayuda.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Se viste"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Se veste"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "VIste"
            }
            ],
          id: '12368767537453784268',
        },
        {
          statement: '¿A qué hora _______ vosotros los sábados?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Acostáis"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Os acostáis"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Acuetáis"
            }
            ],
          id: '1278625462364268',
        },
        {
          statement: '¿Tú _______ los dientes tres veces al día?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cepillas"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Laves"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Te cepillas"
            }
            ],
          id: '123687654278453278544268',
        },
      ],
    },
    {
      id: '123678546327845375434268',
      name: 'Ropa',
      question: [
        {
          statement:
            'Voy a viajar por el norte y llueve mucho, necesito un _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Chubaquero"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sombrero"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Chándal"
            }
            ],
          id: '12362543754237452364268',
        },
        {
          statement: 'Si no me pongo los _______, tengo las manos heladas.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Calcetines"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Vaqueros"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Guantes"
            }
            ],
          id: '1236478546328965432854324268',
        },
        {
          statement: 'Quiero comprarme un _______ para nadar.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Bañador"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Traje"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Polo"
            }
            ],
          id: '123674563986543784514268',
        },
        {
          statement: 'Carmela prefiere llevar ______ que pantalones.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Corbata"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Chaqueta"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Falda"
            }
            ],
          id: '12369563965322484268',
        },
      ],
    },
    {
      id: '123642688686868',
      name: 'Tiempo atmosférico',
      question: [
        {
          statement: 'En junio no _______ frío, no necesitas abrigo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Es"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hace"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Está"
            }
            ],
          id: '12368',
        },
        {
          statement: 'Hoy hace un día malo, _______ nublado.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Está"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Es"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hace"
            }
            ],
          id: '4268',
        },
        {
          statement: 'En invierno ______ mucho.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Lluvia"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Llueve"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Llove"
            }
            ],
          id: '12353535353535268',
        },
        {
          statement:
            'Mi estación favorita es el ______, porque los árboles están amarillos y rojos.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Otoño"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Verano"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Primavera"
            }
            ],
          id: '12785453364268',
        },
      ],
    },
    {
      id: '123687452875462784562785434268',
      name: 'Pretérito perfecto',
      question: [
        {
          statement: 'Esta mañana mis amigos y yo _____ un vídeo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Hemos hacido"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Hamos hecho"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Hemos hecho"
            }
            ],
          id: '1237865375437254375464268',
        },
        {
          statement: '¿Todavía no ______ la película?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Hais visto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Habéis visto"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Habéis vida"
            }
            ],
          id: '12378456728567864268',
        },
        {
          statement: 'El niño ______ el juguete hoy.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Has roto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "He rompido"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Ha roto"
            }
            ],
          id: '12387666666666678564268',
        },
        {
          statement: '¿Alguna vez tú ______ un mensaje en español?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Has escrito"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Has escribió"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "He escrito"
            }
            ],
          id: '12788888862364268',
        },
      ],
    },
    {
      id: '12364876567685278665268',
      name: 'Pronombres OD y OI gustar',
      question: [
        {
          statement: 'La verdura, ¿cómo _____ preparas?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "La"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Lo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Las"
            }
            ],
          id: '12378628756278687542764268',
        },
        {
          statement: 'A Martín _____ encanta este blog de viajes.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Lo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Le"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Te"
            }
            ],
          id: '123687687527854628754268',
        },
        {
          statement: 'Los huevos _____ pongo en la nevera.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Los"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Les"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Me"
            }
            ],
          id: '1238287272728728728728764268',
        },
        {
          statement: 'A mis primas _______ apasiona la montaña.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Os"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Les"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Las"
            }
            ],
          id: '12368678686876868684268',
        },
      ],
    },
    {
      id: '123268',
      name: 'Preposiciones',
      question: [
        {
          statement: 'Este fin de semana nos vamos _____ excursión.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A la"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Al"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "De"
            }
            ],
          id: '123456767676767676764268',
        },
        {
          statement: 'Aquella catarata es la más alta ____ país.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Del"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "De"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "En"
            }
            ],
          id: '17676676767676762364268',
        },
        {
          statement: '¿Echas de menos _______ tu familia?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "De"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sin preposición"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "A"
            }
            ],
          id: '123642687666767676767',
        },
        {
          statement: 'Elena nunca ha ido _______ exposición.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A un"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "A una"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "De"
            }
            ],
          id: '12376767667564268',
        },
      ],
    },
    {
      id: '123642677171717171117168',
      name: 'Vocabulario',
      question: [
        {
          statement: '¿Me trae, por favor, una ______ para comer la sopa?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cuchillo"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tenedor"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cuchara"
            }
            ],
          id: '122888282828282828282364268',
        },
        {
          statement:
            'Voy a ir a la playa y quiero llevarme una camiseta de _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Manga larga"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Tirantes"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cuadros"
            }
            ],
          id: '12363939393939393934268',
        },
        {
          statement:
            'Su tío pone todas las cosas en su lugar. Es muy ________.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Despistado"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Organizado"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Abierto"
            }
            ],
          id: '123643838383838388383268',
        },
        {
          statement:
            'Su barrio tiene mucha vida nocturna, todas las noches hay gente, es muy _______.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Barato"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Feo"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Ruidosa"
            }
            ],
          id: '12364238228215483568',
        },
      ],
    },
    {
      id: '12371185858558585858564268',
      name: 'Variadas de gramática',
      question: [
        {
          statement: '_______ desierto es el más grande del mundo.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Esto"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Este"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Esta"
            }
            ],
          id: '1236426744747474747474748',
        },
        {
          statement: '¿ ________ son las castañuelas? ¿Un instrumento musical?',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Cuál"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Cuáles"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Qué"
            }
            ],
          id: '1236427474747474747474747474768',
        },
        {
          statement: 'Leandro tiene dos cuñadas. ______ cuñadas son de México.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "Su"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Sus"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Suyas"
            }
            ],
          id: '12364286866969698568',
        },
        {
          statement: 'La heladería está ________ taller.',
          responses: [
            {
                id: "1231231221345323453245",
                letter: "A",
                response: "A la derecha"
            },
            {
                id: "123123122453245",
                letter: "B",
                response: "Al lado del"
            },
            {
                id: "1231288222333122453245",
                letter: "C",
                response: "Cerca"
            }
            ],
          id: '12364587447554757575268',
        },
      ],
    },
  ];
  
  try {
    conn = await pool.getConnection();
    let rows = await conn.query("select * from alumnos");
    console.log(req.body);

    

    res.json(exams);
} catch (error) {
    console.log(error);
} finally {
    if (conn) return conn.end();
}

/*
  try {
    conn = await pool.getConnection();
    let rows = await conn.query("select * from accommodation");

    let block = 0;
    let numberQuestion = 0;

    for(let i = 0; exams.length > i; i++){
      if(exams[i].name === req.body.exam.name){
        block = i;
        for(let x = 0; exams[i].question.length > x; x++){
      
          if(exams[i].question[x].statement && exams[i].question[x].statement === req.body.question.statement){
          
            numberQuestion = x;
          };
        }
      };
    };

    for(let i = 0; exams[block].question[numberQuestion].responses.length > i; i++){
      if(exams[block].question[numberQuestion].responses[i].letter === A){
        exams[block].question[numberQuestion].responses[i]
      }
      switch(exams[block].question[numberQuestion].responses[i].letter){
        case "A":
          exams[block].question[numberQuestion].responses[i].response = req.params.responseA
          break;

        case "B":
          exams[block].question[numberQuestion].responses[i].response = req.params.responseB
          break;

        case "C":
          exams[block].question[numberQuestion].responses[i].response = req.params.responseC
          break;
        
        case "D":
          exams[block].question[numberQuestion].responses[i].response = req.params.responseD
          break;

        case "E":
          exams[block].question[numberQuestion].responses[i].response = req.params.responseE
          break;
      }
    }

    res.json(exams)
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) return conn.end();
  }*/
};

//? DELETE UNVALIDATED QUESTION

export const deleteUnvalidated = async (req, res) => {

};

//? EDIT UNVALIDATED QUESTIONS

export const editUnvalidated = async (req, res) => {

};

//? VALIDATED QUESTIONS

export const validatedQuestion = async (req, res) => {

};

//? GET UNVALIDATED ALL EXAMS

export const getUnvalidated = async (req, res) => {
  
};

export const getOnlineExam = async (req, res) => {
  
};

/*export const postExamsA1 = async (req, res) => {

  function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument();
  
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
  
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

        for(let i = 0; req.length > i; i++){
          doc.fontSize(10).text(req[i].statement).moveDown(0.5);
            req[i].responses
            for(let x = 0; req[i].responses.length > x; x++) {
              doc.fontSize(10).text(req[i].responses[x]).moveDown(0.5);
            };
        }

    doc.end();
};

  try {
    const archive = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });
    buildPDF(
      (data) => archive.write(data),
      () => archive.end()
    );
    console.log(res)
    
  } catch (error) {
    console.log(error);
  } finally {
    //if (conn) return conn.end();
  }
}
*/