const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const players= []

class Player {
    constructor(id){
        this.id = id;
    }

    asignPet(pet){
        this.pet = pet;
    }

}

class Pet{
    constructor (name){
        this.name = name;
    }
}

app.get("/join", (req, res) => {

    const id = `${Math.random()}`
    const player = new Player(id)
    players.push(player)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id)
})

app.post("/pet/:playerId", (req, res) => {
    const playerId = req.params.playerId || "No llegó"
    const petName = req.body.pet || "Vacíoooooo"
    const pet = new Pet(petName)
    const playerIndex = players.findIndex((player) => playerId === player.id)
    
    if (playerIndex >= 0) {
        players[playerIndex].asignPet(pet)
    }
    console.log(players)
    console.log(playerId)
    res.end()
})

app.listen(8080, () => {
    console.log("Running Baby")
})