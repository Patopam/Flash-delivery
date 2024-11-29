import { router, socket } from '../routes.js';

export default function renderScreen2() {
    const app = document.getElementById('app');
    app.innerHTML = `
    
    <style>
    body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .container {
    text-align: center;
    width: 300px;
    height: 600px;
    left: 100px;
  }
  
  .logo {
    width: 150px;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 24px;
    color: #000000;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    width: 278px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #000000;
    border-radius: 25px;
    text-align: center;
    outline: none;
  }
  
  input::placeholder {
    color: #000000;
    opacity: 0.7;
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
  
  #processingText {
    margin-top: 10px;
    font-size: 14px;
    color: #888888;
  }
  
    </style>
        <div class="container">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" class="logo" />
  <h2>New Player</h2>

  <form id="registerForm">
    <div>
      <input type="text" id="Name" name="Name" placeholder="Name" required />
    </div>
    <div>
      <input type="text" id="Email" name="Email" placeholder="Email" required />
    </div>
    <div>
      <input type="tel" id="phone" name="phone" placeholder="Phone number" required />
    </div>
  </form>

  <button id="goToScreen3">Let's go!</button>
  <p id="processingText" style="display: none;     font-size: 24px;
    color: #000000;">Procesando...</p>
</div>
        
    `;

    function areInputsFilled() {
        const Name = document.getElementById("Name").value.trim();
        const Email = document.getElementById("Email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        return Name !== "" && Email !== "" && phone !== "";
    }

    async function registerUser() {
        const Name = document.getElementById("Name").value.trim();
        const Email = document.getElementById("Email").value.trim();
        const Phone = document.getElementById("phone").value.trim();
    
        try {
            const response = await fetch('https://6d64-181-54-0-46.ngrok-free.app/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name, Email, Phone })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Error en el registro');
            }
    
            // Guardar el playerId en localStorage desde la respuesta HTTP
            if (data.playerId) {
                localStorage.setItem('playerId', data.playerId);
                console.log('PlayerId guardado desde la respuesta:', data.playerId);
            } else {
                console.error('No se recibió playerId en la respuesta.');
            }

            
        } catch (error) {
            console.error('Error completo:', error);
            alert('Error al registrar usuario: ' + error.message);
        }
    }
    

    function startTimer() {
        const processingText = document.getElementById('processingText');

        // Mostrar el texto "Procesando..."
        processingText.style.display = 'block';

        // Iniciar temporizador de 5 segundos
        setTimeout(() => {
            // Ocultar el texto "Procesando..."
            processingText.style.display = 'none';

            // Llamar a la función que deseas ejecutar al finalizar el temporizador
            onTimerComplete();
        }, 1000);
    }

    function onTimerComplete() {
        
        // Cambiar de pantalla después de recibir el playerId
        router.navigateTo('/Players');
        console.log('Temporizador completado.');
    }

    document.getElementById("goToScreen3").addEventListener("click", async (event) => {
        event.preventDefault();

        const button = event.target; // Obtener el botón que activó el evento

        if (areInputsFilled()) {
      // Iniciar temporizador antes de registrar al usuario
          button.style.display = "none";
            // Iniciar temporizador antes de registrar al usuario
            startTimer();

            // Registrar al usuario
            await registerUser();
        } else {
            alert("Por favor, llena todos los campos antes de continuar.");
        }
        
    });
}
