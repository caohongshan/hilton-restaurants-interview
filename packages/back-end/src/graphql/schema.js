const { buildSchema } = require('graphql');

// 定义 GraphQL 模式
const schema = buildSchema(`
    type Reservation {
        reservationId: ID!
        guestName: String!
        contactInfo: String!
        arrivalTime: String!
        tableSize: Int!
        status: String!
    }
    input ReservationInput {
        guestName: String!
        contactInfo: String!
        arrivalTime: String!
        tableSize: Int!
    }
    type Query {
        reservations: [Reservation!]!
        reservation(reservationId: ID!): Reservation
    }
    type Mutation {
        createReservation(reservation: ReservationInput!): Reservation!
        updateReservation(reservationId: ID!, reservation: ReservationInput!): Reservation!
        cancelReservation(reservationId: ID!): Reservation!
    }
`);
    
module.exports = schema;