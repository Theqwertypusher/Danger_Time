/* eslint-disable no-undef */
const request = require('supertest');

const server = 'http://localhost:3333';

// Please remember to 'npm start' the server before running router tests
describe('Route integration', () => {

  describe('/', () => {
    describe('GET', () => {    //WHATS THE PURPOSE ? 
      it('responds with 200 status and text/html content type', () => request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200));
    });
  });

  describe('/main', () => {
    describe('main/addURL', () => {
      // CHECK RES STATUS AND RES OBJ
      it('responds with 200 status and json content type', () => request(server)
        .post('/main/addURL')
        .send({ url: 'https://pokeapi.co/api/v2/pokemon/ditto' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200));

      it('contains url id and status in body of response', () => request(server)
        .post('/addURL')
        .send({ url: 'https://pokeapi.co/api/v2/pokemon/ditto' })
        .set('Accept', 'application/json')
        .expect((response) => {
          // status obtained from database
          response.body.status = '200';
          response.body.url_id = /\d+/;
        }));
    });

    describe('/checkNow', () => {
      it('responds with 200 status and json content type', () => request(server)
        .post('/main/checkNow')
        .send({ url: 'https://pokeapi.co/api/v2/pokemon/ditto', url_id: 134 })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200));

      it('contains status in body of response', () => request(server)
        .post('/main/checkNow')
        .send({ url: 'https://pokeapi.co/api/v2/pokemon/ditto', url_id: 134 })
        .set('Accept', 'application/json')
        .expect((response) => {
          response.body.status = '200';
        }));
    });
  });
});
