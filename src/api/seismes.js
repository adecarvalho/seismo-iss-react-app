//
const SEISME_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"

const magMax = Math.sqrt(Math.pow(10, 7))

function echelle(val = 0) {
  let ech = Math.pow(10, val)
  ech = Math.sqrt(ech)
  let res = (300 * ech) / magMax

  return res
}

export async function getSeismes() {
  let seismes = []
  let seisme = {}

  try {
    const val = await fetch(SEISME_URL)

    const json = await val.json()

    //console.log(json.features)
    json.features.forEach(element => {
      seisme = {}
      seisme.lng = element.geometry.coordinates[0]
      seisme.lat = element.geometry.coordinates[1]
      seisme.mag = element.properties.mag
      seisme.radius = echelle(element.properties.mag)
      seisme.name = element.properties.place

      seismes.push(seisme)
    })

    return seismes
  } catch (error) {
    return {
      message: error.message
    }
  }
}
