import { router, socket } from "../routes.js";

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <style>
    /* Estilos generales */
.container {
	top: -10px;
   left:-15PX;
    position: absolute;
    height: 100%;
    max-width: 850px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #FFF3D0;
    border-radius: 10px;

    
}

/* Sección de fondo con regalos */
.gift-background {
 border-radius: 10px 10px 0 0 ;
  
    background-color: #ffa500;
    padding: 40px 20px;
    position: relative;
    overflow: hidden;
    min-height: 500px;
    
    width: 800px;
    left: px;
}

/* Contenedor de iconos de regalo */
.gift-icons {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

/* Estilos para los iconos de regalo */
.gift-icons i {
    position: absolute;
    font-size: 150px;
    color: #F2DA91;
    transform: rotate(0deg);
}

/* Posicionamiento de cada icono de regalo */
.gift-icons i:nth-child(1) { top: 10%; left: 2%; transform: rotate(18deg); }
.gift-icons i:nth-child(2) { top:5%; left: 70%; transform: rotate(-27deg); }
.gift-icons i:nth-child(3) { top: 60%; left: 5%; transform: rotate(30deg); }
.gift-icons i:nth-child(4) { top: 40%; left: 70%; transform: rotate(-15deg); }
.gift-icons i:nth-child(5) { top: 80%; left: 85%; transform: rotate(25deg); }
.gift-icons i:nth-child(6) { top: 15%; left: 45%; transform: rotate(-22deg); }
.gift-icons i:nth-child(7) { top: 70%; left: 30%; transform: rotate(20deg); }
.gift-icons i:nth-child(8) { top: 30%; left: 25%; transform: rotate(-32deg); }
.gift-icons i:nth-child(9) { top: 30%; left: 90%; transform: rotate(15deg); }
.gift-icons i:nth-child(10) { top: 70%; left: 60%; transform: rotate(-27deg); }

/* Título principal */
.main-title {
    font-size: 64px;
    font-weight: 900;
    color: #1a1a1a;
    margin-bottom: 40px;
    position: relative;
    z-index: 2;
    top: 150px;
}

/* Instrucciones del juego */
.instructions {
    font-size: 24px;
    line-height: 1.4;
    color: #1a1a1a;
    margin: 3px auto;
    max-width: 500px;
    padding: 5px;
    position: relative;
    z-index: 2;

    
}

/* Contenedor de la animación de carritos */
.cart-animation {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 600px;
    height: 225px; 
}

/* Estilos de los carritos */
.cart-animation i {
    font-size: 200px;
    color: #0B1B2D;
    position: absolute;

}

/* Opacidad gradual de los carritos */
.cart-animation i:nth-child(1) { left: 15%; opacity: 0.05; }
.cart-animation i:nth-child(2) { left: 25%; opacity: 0.1; }
.cart-animation i:nth-child(3) { left: 35%; opacity: 0.4; }
.cart-animation i:nth-child(4) { left: 45%;opacity: 0.7; }
.cart-animation i:nth-child(5) { left: 55%;opacity: 1; }

/* Media queries para responsividad */
@media (max-width: 768px) {
    .main-title {
        font-size: 32px;
    }

    .instructions {
        font-size: 20px;
        padding: 15px;
    }

    .gift-icons i {
        font-size: 36px;
    }

    .cart-animation i {
        font-size: 32px;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 28px;
    }

    .instructions {
        font-size: 18px;
        padding: 10px;
    }

    .gift-icons i {
        font-size: 28px;
    }

    .cart-animation i {
        font-size: 24px;
    }
}
    </style>
<div class="container">
        <div class="gift-background">
            <div class="gift-icons">
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
                <i class='bx bxs-gift'></i>
            </div>
            <h1 class="main-title">Just follow the instructions</h1>
        </div>
        
        <div class="instructions">
            <p>Shake your mobile phone to make your cart run as fast as possible - whoever gets there first is the winner!</p>
        </div>

        <div class="cart-animation">
            <i class='bx bxs-cart-alt'></i>
            <i class='bx bxs-cart-alt'></i>
            <i class='bx bxs-cart-alt'></i>
            <i class='bx bxs-cart-alt'></i>
            <i class='bx bxs-cart-alt'></i>
        </div>
    </div>

    `;

  socket.on("event2", (data) => {
    router.navigateTo('/Game');
    console.log("llego evento 2 ")
  });
}
