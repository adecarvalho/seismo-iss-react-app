import React, { useState, useEffect } from "react"
import L from "leaflet"
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
  Tooltip
} from "react-leaflet"

import iss_icon from "../assets/iss200.png"

import { getSeismes } from "../api/seismes"
import { getIssPosition } from "../api/iss"

const IssIcon = L.icon({
  iconUrl: iss_icon,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -25]
})

const Carte = props => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [zoom, setZoom] = useState(2.0)
  const [seismes, setSeismes] = useState([])

  const [issPosition, setIssPosition] = useState({
    latitude: 0,
    longitude: 0,
    done: false
  })

  const position = [latitude, longitude]

  let handler = undefined

  const whereIss = () => {
    getIssPosition()
      .then(pos => {
        //console.log(pos)
        setIssPosition({
          latitude: pos.latitude,
          longitude: pos.longitude,
          done: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  //seismes fetch
  useEffect(() => {
    getSeismes()
      .then(datas => {
        //console.log(datas)
        setSeismes(datas)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  //iss position
  useEffect(() => {
    handler = setInterval(whereIss, 10000)
    whereIss()

    return () => {
      clearInterval(handler)
    }
  }, [])

  //
  return (
    <div className="col s12 map-container ">
      <Map className="map" center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issPosition.done ? (
          <Marker
            position={[issPosition.latitude, issPosition.longitude]}
            icon={IssIcon}
          >
            <Popup>
              <p>
                Sation ISS
                <br />
                lat: {issPosition.latitude.toFixed(2)} <br />
                lng:{issPosition.longitude.toFixed(2)}
              </p>
            </Popup>
          </Marker>
        ) : (
          ""
        )}

        <Tooltip />

        {seismes.map((item, index) => {
          return (
            <div key={index}>
              <Circle center={[item.lat, item.lng]} fillColor="black" />

              <CircleMarker
                center={[item.lat, item.lng]}
                color="red"
                radius={item.radius}
              >
                <Popup>
                  <p>
                    mag:{item.mag} <br /> {item.name}
                  </p>
                </Popup>
              </CircleMarker>
            </div>
          )
        })}
      </Map>
    </div>
  )
}

export default Carte
