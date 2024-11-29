const { changeEvent } = require("./changeEvent")
const { PhoneEvent } = require("./phoneEvents")
const { GameEvents } = require("./gameEvents")
const handleEvents = (socket, io) => {
  changeEvent(socket, io)
  PhoneEvent(socket, io)
  GameEvents(socket, io)
}

module.exports = { handleEvents, PhoneEvent, GameEvents }
