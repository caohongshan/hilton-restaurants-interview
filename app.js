const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { MongoClient } = require('mongodb');
const app = express();

// 定义GraphQL模式
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
 // 定义GraphQL解析器
const root = {
  reservations: async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('hilton_restaurants');
    const collection = db.collection('reservations');
    const reservations = await collection.find().toArray();
    client.close();
    return reservations;
  },
  reservation: async ({ reservationId }) => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('hilton_restaurants');
    const collection = db.collection('reservations');
    const reservation = await collection.findOne({ reservationId });
    client.close();
    return reservation;
  },
  createReservation: async ({ reservation }) => {
    const reservationId = Math.random().toString(36).substring(7);
    const { guestName, contactInfo, arrivalTime, tableSize } = reservation;
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('hilton_restaurants');
    const collection = db.collection('reservations');
    await collection.insertOne({
      reservationId,
      guestName,
      contactInfo,
      arrivalTime,
      tableSize,
      status: 'pending'
    });
    client.close();
    return {
      reservationId,
      guestName,
      contactInfo,
      arrivalTime,
      tableSize,
      status: 'pending'
    };
  },
  updateReservation: async ({ reservationId, reservation }) => {
    const { guestName, contactInfo, arrivalTime, tableSize } = reservation;
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('hilton_restaurants');
    const collection = db.collection('reservations');
    await collection.updateOne({ reservationId }, {
      $set: {
        guestName,
        contactInfo,
        arrivalTime,
        tableSize
      }
    });
    client.close();
    return {
      reservationId,
      guestName,
      contactInfo,
      arrivalTime,
      tableSize
    };
  },
  cancelReservation: async ({ reservationId }) => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('hilton_restaurants');
    const collection = db.collection('reservations');
    await collection.updateOne({ reservationId }, {
      $set: {
        status: 'canceled'
      }
    });
    client.close();
    return {
      reservationId,
      status: 'canceled'
    };
  }
};

// 将GraphQL中间件添加到应用程序
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

// 启动服务器
app.listen(3000, () => {
  console.log('GraphQL server is running on port 3000');
});