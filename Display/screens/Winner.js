import { router, socket } from '../routes.js';

export default function renderScreen4() {
	const app = document.getElementById('app');
	app.innerHTML = `
	
		<style>
		body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f4;
}

.card {
    background-color: #001028;
    color: #ffffff;
    text-align: center;
    padding: 40px 20px;
    border-radius: 15px;
    width: 700px;
    height: 850PX;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card h1 {
    font-size: 68px;
    margin: 20px 0;
    color: #ffffff;

}
.card P {
    font-size: 68px;
    margin: 20px 0;
    color: #ffffff;

}

#Trophy {
    font-size: 600px;
    margin-top: 20px;
    color: #FFB000;

}

		</style>
        <div class="card">
			<h1>Winner</h1>
				<div>
					<i id= Trophy class='bx bxs-trophy'></i>
				</d	iv>
			<p id="winnerName">Procesando...</p>

		</div>

    `;

    // Función para iniciar el temporizador
function startTimer(seconds, onTimerEnd) {
    if (isNaN(seconds) || seconds <= 0) {
        console.log("Por favor, introduce un número válido de segundos.");
        return;
    }

    let remainingTime = seconds;

    console.log(`Temporizador iniciado: ${remainingTime} segundos`);

    const timerInterval = setInterval(() => {
        remainingTime--;

        if (remainingTime > 0) {
            console.log(`Tiempo restante: ${remainingTime} segundos`);
        } else {
            clearInterval(timerInterval);
            console.log("¡El temporizador ha terminado!");
            if (typeof onTimerEnd === "function") {
                onTimerEnd();
            }
        }
    }, 1000);
}

// Función que se ejecutará al finalizar el temporizador
function onTimerEnd() {
    router.navigateTo('/');
    console.log("Acción ejecutada al finalizar el temporizador.");
}

// Ejemplo: inicia el temporizador con 10 segundos
const seconds = 30; // Cambia este valor para probar con otro tiempo
startTimer(seconds, onTimerEnd);



		


	// Mostrar el ganador
	socket.on("Winner", (winner) => {
		console.log("Jugador ganador recibido:", winner);

		// Acceder al elemento del nombre y actualizarlo
		const winnerNameElement = document.getElementById("winnerName");
		winnerNameElement.textContent = `¡El ganador es: ${winner.Name}!`;
	});
}
