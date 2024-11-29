import { router, socket } from '../routes.js';

export default function renderScreen3() {
    const app = document.getElementById('app');
    app.innerHTML = `
    
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" class="logo" />

        <style>
        body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
}

h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 50px;
}

.cart-container {
    position: relative;
}

	img{
	    width: 200px;

	}
.cart-container p {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 22px;
    font-weight: bold;
    margin-top: 10px;
}

#cart2 {
    font-size: 250px;
    color: #f7a800;
}
     button {
    background-color: #1b2a42;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    padding: 15px 30px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #142032;
  }
p2{
color: #ffffff;
}

        </style>
        <h1>Shake it till you make it</h1>
        <div id="playerInfo">
         Jugador: <span id="playerNumber">Cargando...</span>
        </div>
        <i id="cart2" class="bx bxs-truck"></i>
        <p id="shakeCounter">Shakes: 0</p>
        <p2 id="movementValue">Movement Value: 0</p2>
        <button id="startButton">Start Shaking!</button>
         `;


    let shakeCount = 0;
    let lastY = 0;
    let movementValue = 0;
    const THRESHOLD = 2;
    const counterDisplay = document.getElementById('shakeCounter');
    const movementDisplay = document.getElementById('movementValue');
    let isTracking = false;

    function sendShakeCount() {
        const playerId = localStorage.getItem('playerId');
        
        if (playerId === 'Player2') {
            socket.emit('MovementPlayer2', { 
                shakeCount, 
                playerId 
            });

        } else if (playerId === 'Player1') {
            socket.emit('MovementPlayer1', { 
                shakeCount, 
                playerId 
            });
        }
    }

    

    // Función para manejar el movimiento
    function handleMotion(event) {
        if (!isTracking) return;
        
        const acceleration = event.accelerationIncludingGravity;
        const currentMovement = Math.abs(acceleration.y - lastY);
        
        // Actualizamos el valor del movimiento
        movementValue += currentMovement;
        movementDisplay.textContent = `Movement Value: ${movementValue.toFixed(2)}`;
        
        // Si detectamos un shake, incrementamos el contador y enviamos el dato
        if (currentMovement > THRESHOLD) {
            shakeCount++;
            counterDisplay.textContent = `Shakes: ${shakeCount}`;
            console.log('Shakes:', shakeCount);
            // Enviamos el shakeCount cada vez que se incrementa
            sendShakeCount();
        }
        
        lastY = acceleration.y;
    }

    // Función para iniciar el seguimiento
    async function startTracking() {
        try {
            const playerId = localStorage.getItem('playerId');

            const playerNumberSpan = document.getElementById('playerNumber');
            const cart2 = document.getElementById('cart2');
            if (playerId === 'Player1') {
                playerNumberSpan.textContent = 'Player 1';
                playerNumberSpan.style.color = '#29A7D9';
                cart2.style.color = '#29A7D9';
            } else if (playerId === 'Player2') {
                playerNumberSpan.textContent = 'Player 2';
                playerNumberSpan.style.color = '#0B1B2D';
                cart2.style.color = '#0B1B2D';
            } else {
                playerNumberSpan.textContent = 'No asignado';
                playerNumberSpan.style.color = 'gray';
            }
            // Para iOS 13+ necesitamos pedir permiso
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                    isTracking = true;
                    document.getElementById('startButton').textContent = 'Tracking Active!';
                    document.getElementById('startButton').disabled = true;
                } else {
                    alert('Permission denied. Please allow motion sensors to play.');
                }
            } else {
                // Para Android y versiones anteriores de iOS
                window.addEventListener('devicemotion', handleMotion);
                isTracking = true;
                document.getElementById('startButton').textContent = 'Tracking Active!';
                document.getElementById('startButton').disabled = true;
            }
        } catch (error) {
            console.error('Error starting motion tracking:', error);
            alert('Error starting motion tracking. Please try again.');
        }
    }

    // Agregar evento al botón de inicio
    document.getElementById('startButton').addEventListener('click', startTracking);


    socket.on('winnerChange', () => {
        router.navigateTo('/Message');
    });

    // Limpieza cuando se desmonte el componente
    return () => {
        if (isTracking) {
            window.removeEventListener('devicemotion', handleMotion);
        }
    };

    
}