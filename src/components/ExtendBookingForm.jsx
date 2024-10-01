import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../ExtendBookingForm.css"; // Assuming the CSS provided is saved as ExtendBookingForm.css

const ExtendBookingForm = () => {
  const [formData, setFormData] = useState({
    carNumber: "",
    newDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Extend Booking Data Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Extend Booking</h2>
      <form className="extend-booking-form" onSubmit={handleSubmit}>
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
          <label htmlFor="newDate">New Date:</label>
          <input
            type="date"
            id="newDate"
            name="newDate"
            value={formData.newDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Extend Booking
        </button>
      </form>
    </div>
  );
};

export default ExtendBookingForm;
