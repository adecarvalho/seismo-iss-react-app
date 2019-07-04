//
const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544"

export async function getIssPosition() {
  try {
    const res = await fetch(ISS_URL)
    const json = await res.json()

    return {
      latitude: json.latitude,
      longitude: json.longitude
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}
