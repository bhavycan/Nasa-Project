const API_URL = 'http://localhost:8000/v1'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
  // Load planets and return as JSON.
}

async function httpGetLaunches(launch) {
  const response = await fetch(`${API_URL}/launches`)
  const fetchesLaunches = await response.json()
  return fetchesLaunches.sort((a,b) => {
    return a.flightNumber - b.flightNumber
    //if the result is negative sort will ascending order
  })
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
try{
  return await fetch(`${API_URL}/launches`,{
    method : "post",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(launch)

  }) 
}catch(err){
  return{
    ok: false
    //if error than flage it and pop up the error sound 
  }
}


  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {

  try{
    return await fetch(`${API_URL}/launches/${id}`,{
      method : "delete"
    }) 
  }catch(err){
    console.log(err)
    return{
      ok: false
    }
  }
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};