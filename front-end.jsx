import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    fetchReservations();
  }, []);
   const fetchReservations = async () => {
    try {
      const response = await axios.get('/reservations');
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
   if (loading) {
    return <div>Loading...</div>;
  }
   return (
    <div>
      <h1>Reservations</h1>
      {reservations.map((reservation) => (
        <div key={reservation.reservationId}>
          <h3>{reservation.guestName}</h3>
          <p>Contact Info: {reservation.contactInfo}</p>
          <p>Arrival Time: {reservation.arrivalTime}</p>
          <p>Table Size: {reservation.tableSize}</p>
          <p>Status: {reservation.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;