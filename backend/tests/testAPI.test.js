//JEST 
//SUPERTEST
require('jest');
const request = require('supertest');
const app = require('../index');
const uuid = require('uuidv4');

 
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});
 
describe('GET /api/rockets', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/api/rockets')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /api/rockets', function() {
    let idReceived;
    afterAll(()=>{
      if(idReceived){
        console.log(idReceived);
      }
    })
    it('responds with json', function(done) {
      request(app)
        .post('/api/rockets')
        .send({name: 'john',country:"France",takeOffThrust:45})
        .set('Accept', 'application/json')
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          idReceived = res.body.id;
          done();
        });
    });
  });