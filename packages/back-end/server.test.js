// const request = require('supertest');
// const app = require('./app');

// describe('Reservation API', () => {
//     it('should create a new reservation', async () => {
//         const res = await request(app)
//         .post('/reservations')
//         .send({
//             guestName: 'John Doe',
//             contactInfo: 'john.doe@example.com',
//             arrivalTime: '2022-01-01 18:00',
//             tableSize: 4
//         });
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveProperty('reservationId');
//     });
//    it('should update an existing reservation', async () => {
//         const res = await request(app)
//         .put('/reservations/123')
//         .send({
//             guestName: 'Jane Smith',
//             contactInfo: 'jane.smith@example.com',
//             arrivalTime: '2022-01-01 19:00',
//             tableSize: 6
//         });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('message', 'Reservation updated successfully');
//     });
//    it('should cancel an existing reservation', async () => {
//     const res = await request(app)
//         .delete('/reservations/123');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('message', 'Reservation canceled successfully');
//     });
//    it('should get all reservations', async () => {
//         const res = await request(app)
//         .get('/reservations');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toBeInstanceOf(Array);
//     });
//     it('should get reservation details', async () => {
//         const res = await request(app)
//         .get('/reservations/123');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('reservationId', '123');
//     });
// });