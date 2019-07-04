import React from "react"

import NavBar from "./components/NavBar"
import Carte from "./components/Carte"
import Footer from "./components/Footer"

function App() {
  //
  return (
    <div className="fluide">
      <NavBar />

      <div className=" row">
        <div className="col s12">
          <Carte />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
