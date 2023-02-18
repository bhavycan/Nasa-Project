const path = require('path')
const {parse} = require('csv-parse');
//there is a new way to parse the file you have to do object destructure fo that
const fs = require('fs');
const planets = require('./planets.mongo')



function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

/*
const promise = new promise((resolve,reject) => {
    resolve(42)
})
promise.then((result) => {

})


const result = await promise
*/


function loadPlanetsData(){
    return new Promise((resolve,rejects) =>{
        fs.createReadStream(path.join(__dirname,'..','data','kepler_data.csv'))
        .pipe(parse({
          comment: '#',
          columns: true,
        }))
        .on('data',async(data) => {
          if (isHabitablePlanet(data)) {
            //upsert = insertt + update
            await savePlanet(data)
          }
        })
        .on('error', (err) => {
          console.log(err);
          rejects(err)
        })
        .on('end', async() => {
          const countPlanetsFound = (await getAllPlanets()).length;
          console.log(`${countPlanetsFound} habitable planets found!`);
          resolve();
        });
    })
    
}

async function savePlanet(planet){
 try{
  await planets.updateOne({
    keplerName: planet.kepler_name, //check it is exist 
   }, {
    keplerName: planet.kepler_name, //update
   },{
    upsert : true,
   })
 }catch(err){
  console.error(`Could not save Planet ${err}`)
 }
} 

async function getAllPlanets(){
  return await planets.find({}, {
    '__id': 0, '__v': 0
    //first parameter filter, and second filter sayas projection that we only want to include 
}); 
}

module.exports = {
    loadPlanetsData,
  getAllPlanets

}