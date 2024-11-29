import { router, socket } from '../routes.js';
//import { sendWinnerEmail } from '../../server/SERVICES/Brevo.js';
export default function renderScreen3() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
    <style>
    body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4e5c3;
    margin: 0;
    padding: 0;
}

.logo {
    position: relative;

    top: 50px;
    width: 300px;
 
}

.caja {
    position: relative;
    width: 100%;
    height: 800px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fondo-blanco {
    position: absolute;
    bottom: -200px;
    width: 820px;
    height: 600px;
    background-color: #ffffff;
    z-index: 0;
}

#carro1, #carro2, #casa {
    position: absolute;
    font-size: 120px;
    bottom: 185px;
    z-index: 1;
}

#carro1 {
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    color: #29A7D9;
}

#carro2 {
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    color: #0B1B2D;

}

#casa {
    top: 50%;
    transform: translateY(-50%);
    left: 625px;
    color: #221F1F;
}

p#shakes {
    margin-top: 20px;
    font-size: 20px;
    color: #000;
}


    </style>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        
		  
        

    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" class="logo" />

    <div class="caja">
    
        <div class="fondo-blanco"></div>
        <i id="carro2" class="bx bxs-truck"></i>
        <i id="carro1" class="bx bxs-truck"></i>
        <i id="casa" class="bx bxs-home"></i>
    </div>

    <p id="shakes">Shakes: 0</p>


    `;
    
    // Array de jugadores (simulado por ahora)
    let players = [];

    // Recibir los jugadores del backend
    socket.on("Players", (data) => {
        players = data.players; // Guardamos la lista de jugadores
        console.log("Jugadores recibidos:", players);
    });

    socket.on("MovementPlayer1", (data) => {
        console.log("Movimiento Player1:", data);
        moveCar(data.shakeCount, 'carro1', data.playerId);
    });

    socket.on("MovementPlayer2", (data) => {
        console.log("Movimiento Player2:", data);
        moveCar(data.shakeCount, 'carro2', data.playerId);
    });

    // Función para mover el carro
    function moveCar(shakeCount, carId, playerId) {
        const car = document.getElementById(carId);
        // Calculamos la posición basada en el shakeCount
        const newPosition = shakeCount
        car.style.left = newPosition + "px";

        // Si llegamos a 530 shakes, determinamos el ganador
        if (shakeCount === 530) {
            // Buscamos al ganador en el arreglo de jugadores
            const winner = players.find(player => player.playerId === playerId);
            if (winner) {
                // Emitimos el evento del ganador al backend
           
                socket.emit('winnerChange');
                // Cambiamos la pantalla para mostrar al ganador
                router.navigateTo('/Winner');
                socket.emit('Winner', winner);
                console.log("el ganador es: ", winner)
                // Enviar el correo al ganador
             
            }
        }
    }

    

    // Limpieza de listeners cuando se desmonte el componente
    return () => {
        socket.off("MovementPlayer1");
        socket.off("MovementPlayer2");
        socket.off("Players");
    };
}
