const socket = io("https://6d64-181-54-0-46.ngrok-free.app", { path: "/real-time" });

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("playersData", (data) => {
  console.log("Jugadores recibidos en el cliente:", data);
  // Actualizar el estado o mostrar los jugadores en la interfaz según sea necesario
});

export default socket;

