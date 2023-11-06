import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // GraphQL 服务器的地址
  cache: new InMemoryCache(),
});

const GET_RESERVATIONS = gql`
  query {
    reservations {
      guestName
      contactInfo
      arrivalTime
      tableSize
      status
    }
  }
`;

const Compoent = () => {
  const { loading, error, data } = useQuery(GET_RESERVATIONS);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
   return (
    <div>
      {data.reservations.map(reservation => (
        <div key={reservation.reservationId}>
          <p>Guest Name: {reservation.guestName}</p>
          <p>Contact Info: {reservation.contactInfo}</p>
          <p>Arrival Time: {reservation.arrivalTime}</p>
          <p>Table Size: {reservation.tableSize}</p>
          <p>Status: {reservation.status}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Compoent />
  </ApolloProvider>
);

export default App;