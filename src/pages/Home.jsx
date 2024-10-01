import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Info from "../components/Info";
import About from "../components/About";
// import BookAppointment from "../components/BookParkingForm";
// import BookParking from "../components/BookParkingForm";
import ParkPal from "../components/Parkpal";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-section">
      {/* <Navbar /> */}
      <Hero />
      <Info />
      <About />
      {/* <BookAppointment /> */}
      <ParkPal />
      <Reviews />
      {/* <Doctors /> */}
      <Footer />
    </div>
  );
}

export default Home;
