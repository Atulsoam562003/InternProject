import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import BookParking from "./pages/bookParking";
import Index from "./pages/index";
import Initialize from "./pages/initialize";
import Report from "./pages/report";
import Header from "./components/header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CustomParkingSlot from "./pages/CustomParkingSlot";
import ExtendBookingForm from "./components/ExtendBookingForm";
import Maps from "./pages/Maps";

function App() {
  let loggedinUser = localStorage.getItem("username");
  let isLoggedIn =
    loggedinUser !== undefined && loggedinUser !== null && loggedinUser !== "";

  return (
    <BrowserRouter>
      <Container fluid>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Index />} />
            <Route path="/maps" element={isLoggedIn ? <Maps /> : <Index />} />
            {/* <Route path="/" element={isLoggedIn ? <Index /> : <Home />} /> */}
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Home /> : <Index />}
              // element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/initialize"
              element={isLoggedIn ? <Initialize /> : <Navigate to="/" />}
            />
            <Route
              path="/bookParking"
              element={isLoggedIn ? <BookParking /> : <Navigate to="/" />}
            />
            <Route
              path="/report"
              element={isLoggedIn ? <Report /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/custom-parking-slot"
              element={isLoggedIn ? <CustomParkingSlot /> : <Navigate to="/" />}
            />
            <Route
              path="/extend-booking"
              element={isLoggedIn ? <ExtendBookingForm /> : <Navigate to="/" />}
            />
          </Routes>
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
