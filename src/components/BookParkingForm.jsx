import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../ParkingBookingForm.css";

const ParkingBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    carNumber: "",
    parkingSlot: "",
    booking_date_time: "",
    duration: "60", // Default duration to 60 minutes
    email: "", // New field for email
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/available-slots"
        );
        const slots = await response.json();
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    fetchSlots();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate release_date_time based on booking_date_time and duration
    const bookingDateTime = new Date(formData.booking_date_time);
    const releaseDateTime = new Date(
      bookingDateTime.getTime() + formData.duration * 60000
    );
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3005/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          release_date_time: releaseDateTime,
        }),
      });

      const result = await response.json();
      console.log("Form Data Submitted:", result);
      if (response.ok) {
        navigate("/payment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Book a Parking Slot</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="carNumber">Car Number:</label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input
            type="email" // Ensure it's an email field
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parkingSlot">Parking Slot:</label>
          <select
            id="parkingSlot"
            name="parkingSlot"
            value={formData.parkingSlot}
            onChange={handleChange}
            required
          >
            <option value="">Select a slot</option>
            {availableSlots.map((slot) => (
              <option key={slot._id} value={slot.parking_space_id}>
                {slot.parking_space_id} - {slot.parking_space_title}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="booking_date_time">Booking Date & Time:</label>
          <input
            type="datetime-local"
            id="booking_date_time"
            name="booking_date_time"
            value={formData.booking_date_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Booking Duration:</label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="240">4 hours</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Book Now
        </button>
      </form>
      <div className="extend-booking-link">
        <p>
          Already booked a slot?{" "}
          <Link to="/extend-booking">Extend your booking here</Link>
        </p>
      </div>
    </div>
  );
};

export default ParkingBookingForm;
