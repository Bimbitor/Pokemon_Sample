const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const players= []

class Player {
    constructor(id){
        this.id = id
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
    console.log(players)
    const playerId = req.params.playerId || "No llegó"
    console.log(playerId)
    res.end()
})

app.listen(8080, () => {
    console.log("Running Baby")
})