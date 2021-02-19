const baseUrl = "http://localhost:8000"

async function brightnessGet(){
  let response = await fetch(baseUrl + "/settings/brightness", {
    method: 'GET',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  console.log(response)
  return response
}

async function brightnessSet(val){
  let response = await fetch(baseUrl + "/settings/brightness/" + val, {
    method: 'POST',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({})
  })
  console.log(response)
  return response
}

async function musicList(){
  let response = await fetch(baseUrl + "/musics", {
    method: 'GET',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  console.log(response)
  return response
}


export {brightnessGet, brightnessSet, musicList}