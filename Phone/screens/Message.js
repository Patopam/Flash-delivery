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
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card p {
    font-size: 18px;
    margin: 20px 0;
}
h1{
	margin: 5px 60px;
}
	img{
	    width: 200px;
		margin: 0 60px;
	}

#gift2 {
    font-size: 150px;
    margin-top: 20px;
}

	</style>

	<img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" class="logo" />
        <h1>The winner is:</h1>
    <div class="card">
	<p id="winnerName"></p>

        <div>
			<i id="gift2" class="bx bxs-gift"></i>
		</div>
		<p>Your reward will be sent to your Email</p>

    </div>

    `;


		// Mostrar el ganador
		socket.on("Winner", (winner) => {
			console.log("Jugador ganador recibido:", winner);
	
			// Acceder al elemento del nombre y actualizarlo
			const winnerNameElement = document.getElementById("winnerName");
			winnerNameElement.textContent = `¡El ganador es: ${winner.Name}!`;
		});
}
