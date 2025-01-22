import React, { Component } from "react";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import { EstablishmentDetails } from "./components/EstablishmentDetail";

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/establishment" element={<EstablishmentDetails />} />
        </Routes>
      </div>
    );
    // return <HomePage />;
  }
}

export default App;
