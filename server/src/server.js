const http = require('http')
require('dotenv').config();
const app = require('./app')
const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model')
const { loadLaunchesData } = require('./models/launches.model')

const PORT = process.env.PORT||8000;

const server = http.createServer(app)
//the middleware assigned with app will response to the createserver


async function startServer(){
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchesData();
}

server.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`)
})

startServer();