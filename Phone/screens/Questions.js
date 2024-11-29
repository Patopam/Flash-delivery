import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
	

	<style>
	  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
  }
  
  .container {
    text-align: center;
    position: relative;
    width: 100%;
    max-width: 100vw; /* Ancho máximo de un iPhone 12 Pro */
  }
  
  h1 {
    font-size: 18px; /* Tamaño reducido para caber en pantallas más pequeñas */
    font-weight: bold;
    color: #000000;
    margin-bottom: 20px;
    padding: 0 20px; /* Espacio para evitar que el texto se corte en los bordes */
  }
  
  .icons {
    position: relative;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  #face {
    color: #50c4e8;
    font-size: 70px;
    position: absolute;
    top: 0;
    left: -50px;
  }
  
  #cart {
    color: #94d9f0;
    font-size: 80px;
    position: absolute;
    top: 40px;
    right: -60px;
    transform: rotate(20deg);
  }
  
  #gift {
    color: #fcb436;
    font-size: 75px;
    position: absolute;
    bottom: 30px;
    left: 10px;
  }
  
  #package {
    color: #f1d593;
    font-size: 70px;
    position: absolute;
    bottom: -10px;
    right: 20px;
  }
  
  button {
    background-color: #1b2a42;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    width: 80%; /* Botón más ancho para pantallas pequeñas */
  }
  
  button:hover {
    background-color: #142032;
  }
  
  /* Media Query para iPhone 12 Pro */
  @media screen and (max-width: 430px) {

  
	img{
	    width: 200px;

	}
    h1 {
      font-size: 32px;
    }
  
    #face {
      font-size: 150px;
      top: -10px;
      left: -40px;
      transform: rotate(-34.87deg);
    }
  
    #cart {
      font-size: 150px;
      top: 30px;
      right: -50px;
      transform: rotate(-32.29deg);
    }
  
    #gift {
      font-size: 140px;
      bottom: 20px;
      left: 5px;
      transform: rotate(32.38deg);
    }
  
    #package {
      font-size: 150px;
      bottom: -20px;
      right: 15px;
      transform: rotate(-30.84deg);
    }
  
    button {
      font-size: 14px;
      padding: 10px 20px;
    }
  }
  
	</style>

       <div class="container">
	     <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" class="logo" />

    <h1>Just 3 questions before you start!</h1>
    <div class="icons">
      <i id="face" class="bx bxs-face"></i>
      <i id="cart" class="bx bxs-cart-alt"></i>
      <i id="gift" class="bx bxs-gift"></i>
      <i id="package" class="bx bxs-package"></i>
    </div>
		<button id="goToScreen2">I'm ready</button>
  </div>
    `;

	document.getElementById('goToScreen2').addEventListener('click', () => {
		router.navigateTo('/Register');
	});
	document.getElementById("goToScreen2").addEventListener("click", () => {
		console.log("emited");
		socket.emit("event1");
		
	  });

	
}
