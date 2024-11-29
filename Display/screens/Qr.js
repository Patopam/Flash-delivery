import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `


		<style>
		
		.container {
		position: absolute;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
	bottom: 200px;
    background-color: white;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .background-text {
    color: #f0f0f0;
    font-size: 12px;
    line-height: 1.4;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    text-align: justify;
  }
  
  .amazon-logo {
    width: 300px;
    margin: 20px auto;
  }
  
  h1 {
    font-size: 48px;
    font-weight: 900;
    color: #000;
    margin: 30px 0;
    line-height: 1.2;
  }
  
  .highlight {
    color: #ff9900;
  }
  
  .qr-code {
    width: 500px;
    height: 500px;
    margin: 40px auto;
  }
		</style>
		<div class="container">
		<div class="background-text">
			Amazon we offer you much more than just an online shop... <!-- Texto de fondo repetido -->
		</div>
		
		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="Amazon" class="amazon-logo">
		
		<h1>Do it like a true champion! <span class="highlight">Do you dare?</span></h1>
		
		<img src="./QR/dash-QR.PNG" alt="QR Code" class="qr-code">
		</div>


    `;

	socket.on('showSomething', (data) => {
		router.navigateTo('/Instructions');
	});
}
