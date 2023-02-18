const axios = require('axios');
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
//js map object
//object of object where valuses are the object withe the respective keys which is the flightnumber

// const launch = {
//   flightNumber: 100,
//   mission: "Kepler Exploration X",
//   rocket: "Explorer IS1",
//   launchDate: new Date("December 27, 2030"),
//   // it is good to add the datae as the javascript object
//   target: "Kepler-442 b",
//   customers: ["Bhavy", "NASA"], //payloads.customer
//   upcoming: true,
//   success: true,
// };

// saveLaunch(launch);


const SPACEX_API_URL = "https://api.spacexdata.com/v5/launches/query";



async function populateLaunces() {
  console.log('Downloading launches data from SpaceX...');
  const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
          pagination: false,
          populate: [
              {
                  path: 'rocket',
                  select: {
                      name: 1
                  }
              },
              {
                  path: 'payloads',
                  select: {
                      'customers': 1
                  }
              }
          ]
      }
  });

  if(response.status !== 200) {
      console.log('Failed to download launch data from SpaceX');
      throw new Error('Launch Data download failed!')
  }

  const launchDocs = response.data.docs;
  console.log(launchDocs)
  for(const launchDoc of launchDocs) {
      const payloads = launchDoc['payloads'];
      const customers = payloads.flatMap((payload) => {
          return payload['customers'];
      });

      const launch = {
          flightNumber: launchDoc['flight_number'],
          mission: launchDoc['name'],
          rocket: launchDoc['rocket']['name'],
          launchDate: launchDoc['date_local'],
          upcoming: launchDoc['upcoming'],
          success: launchDoc['success'],
          customers: customers
      };

      console.log(`${launch.flightNumber} ${launch.mission} `);
     await saveLaunch(launch)
  }
};

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
      flightNumber: 1,
      rocket: 'Falcon 1',
      mission: 'FalconSat'
  });

  if(firstLaunch) {
      console.log('Launch already exists');
      return;
  }else {
      await populateLaunces();
  }
};

async function findLaunch(filterObject) {
  return await launchesDatabase.findOne(filterObject)
};


  

//launches.set(launch.flightNumber, launch)
//setting the key with the respective floightnumber of object in launches object
//set is the property of MAP object

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
  //return true if exist
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne({}).sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches(skip,limit) {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  ).sort({ flightNumber: 1 }).skip(skip).limit(limit);
}

async function saveLaunch(launch) {
 

  //upsert operation
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function schedualeNewLaunch(launch) {

  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching Planet Found!");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    customer: ["Bhavy", "Nasa"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

// function addNewLaunch(launch){
//     latestFlightNumber++;

//     launches.set(latestFlightNumber, Object.assign(launch, {
//         customer: ['ZTM', 'Nasa'],
//         upcoming :true,
//         success: true,
//         flightNumber : latestFlightNumber
//     }))
// }

async function abortLaunchById(launchId) {
  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  ); //we dont want to insert if the document docent exist so we are not writing upsert

  return aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchesData,
  existsLaunchWithId,
  getAllLaunches,
  schedualeNewLaunch,
  abortLaunchById,
};
