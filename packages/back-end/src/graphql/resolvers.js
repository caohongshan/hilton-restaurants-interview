const Reservation = require('../models/reservation');

const Query = {
    reservations: async () => {
        try {
          console.log("Reservation==", Reservation)
          const reservations = await Reservation.find();
          return reservations;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch reservations');
        }
    },
    reservation: async (_, { reservationId }) => {
        try {
            const reservation = await Reservation.findById(reservationId);
            return reservation;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch reservation');
        }
    },
}

const Mutation = {
    createReservation: async (_, { reservation }) => {
        try {
          const createdReservation = await Reservation.create(reservation);
          return createdReservation;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to create reservation');
        }
    },
    updateReservation: async (_, { reservationId, reservation }) => {
        try {
          const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { $set: reservation },
            { new: true }
          );
          return updatedReservation;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update reservation');
        }
    },
    cancelReservation: async (_, { reservationId }) => {
        try {
          const canceledReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { $set: { status: 'canceled' } },
            { new: true }
          );
          return canceledReservation;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to cancel reservation');
        }
    },
}


module.exports = {
    ...Query,
    ...Mutation
};