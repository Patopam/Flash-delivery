    const { getIO, socket } = require("../socket");
const users = require("../db/users");

const getPlayers = async (req, res) => {
    try {
        const usersResponse = await users.getAllPlayers();
        res.status(200).json(usersResponse);
    } catch (err) {
        console.error('Error getting players:', err);
        res.status(500).json({ error: err.message });
    }
};
  // Variable global para almacenar los jugadores (fuera de la función)
const players = [];

const createPlayers = async (req, res) => {
    try {
        //console.log('Body recibido:', req.body);
        const { Name, Email, Phone } = req.body;

        if (!Name || !Email || !Phone) {
            console.log('Datos faltantes:', { Name, Email, Phone });
            return res.status(400).json({ 
                error: "Todos los campos son requeridos" 
            });
        }

        //console.log('Intentando crear usuario con:', { Name, Email, Phone });
        const userCreated = await users.createPlayers({ Name, Email, Phone });
        //console.log('Usuario creado:', userCreated);

        // Generar un identificador único para el jugador
        const playerId = `Player${players.length + 1}`;

        // Agregar el nuevo jugador al arreglo con su identificador
        players.push({ 
            playerId, 
            Name, 
            Email, 
            Phone 
        });

           console.log("el jugador es: ", playerId)

        // Si hay dos jugadores, emitir los eventos
        if (players.length === 2) {
            console.log("prueba2" , players)
            getIO().emit("event2");
            getIO().emit("Players", { players });
            players.length = 0;
        }
        console.log("prueba1" , players)
        // Devolver el identificador del jugador en la respuesta
        return res.status(200).json({ 
            message: "Jugador registrado exitosamente",
            playerId 
        });

    } catch (error) {
        console.error('Error en createPlayers:', error);
        return res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
}
const nodemailer = require('nodemailer');

// const sendWinnerEmail = async (email, name) => {
//     try {
//         // Configuración del servicio de correo (usaremos Gmail como ejemplo)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         // Contenido del correo
//         const mailOptions = {
//             from: 'tuemail@gmail.com',
//             to: email,
//             subject: '¡Felicidades, has ganado!',
//             text: `¡Hola ${name}!\n\nFelicidades por ganar el juego. ¡Eres un campeón! 🎉`
//         };

//         // Enviar el correo
//         await transporter.sendMail(mailOptions);
//         console.log('Correo enviado exitosamente a:', email);
//     } catch (error) {
//         console.error('Error al enviar el correo:', error);
//     }
// };



module.exports = { getPlayers, createPlayers, };