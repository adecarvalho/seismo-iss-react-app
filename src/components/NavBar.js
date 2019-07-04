import React from "react"
const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper indigo darken-3">
        <a
          href="https://earthquake.usgs.gov/earthquakes"
          target="_blank"
          className="brand-logo center"
        >
          Earthquakes Web App
        </a>
      </div>
    </nav>
  )
}

export default NavBar
