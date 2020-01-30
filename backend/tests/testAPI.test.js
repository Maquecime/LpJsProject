//JEST 
//SUPERTEST
require('jest');
const request = require('supertest');
const app = require('../index');
const uuid = require('uuidv4');
const maDal = require('../dal/rockets_dal')


 
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
      maDal.deleteRocket(idReceived).then(()=>{
      }).catch((err)=>{
      });      
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

describe('UPDATE /api/rockets', function(){
  let generatedUuid;
  let runTest = true;
  let originalRocket = {name:'testName', country:'testCountry', takeOffThrust:0};
  let modified = {name:'testNameModified', country:'testCountryModified', takeOffThrust:10};

  beforeAll(()=>{
    maDal.insertRocket(originalRocket).then((answ)=>{
      generatedUuid = answ;
    }).catch(()=>{
      runTest=false;
    });     
  });

  afterAll(()=>{
    if(generatedUuid){
      maDal.deleteRocket(generatedUuid).then((answ)=>{

      }).catch(err =>{});
    }
  });

  if(runTest){
    describe('Post Endpoints', () => {
      it('should update the rocket', async () => {
        const res = await request(app)
          .put(`/api/rockets/${generatedUuid}`)
          .send(modified)
          .set('Accept','application/json');
        expect(res.statusCode).toEqual(201)
        expect(res.body.name).toEqual('testNameModified')
        expect(res.body.takeOffThrust).toBe(10)
      })
    })
  }
  });

describe('DELETE /api/rockets', function(){
  let generatedUuid;
  let runTest = true;
  let originalRocket = {name:'testName', country:'testCountry', takeOffThrust:0};

  beforeAll(()=>{
    maDal.insertRocket(originalRocket).then((answ)=>{
      generatedUuid = answ;
    }).catch(()=>{
      runTest=false;
    });     
  });

  if(runTest){
    describe('DELETE Endpoints', () => {
      it('should delete the rocket', async () => {
        const res = await request(app)
          .delete(`/api/rockets/${generatedUuid}`)
          .set('Accept','application/json');
        expect(res.statusCode).toEqual(204)
      })
    })
  }
});

describe('GET /api/rockets', function(){
  let generatedUuid;
  let runTest = true;
  let originalRocket = {name:'testName', country:'testCountry', takeOffThrust:0};

  beforeAll(()=>{
    maDal.insertRocket(originalRocket).then((answ)=>{
      console.log(answ);
      generatedUuid = answ;
    }).catch(()=>{
      runTest=false;
    });     
  });

  afterAll(()=>{
    if(generatedUuid){
      maDal.deleteRocket(generatedUuid).then((answ)=>{

      }).catch(err =>{});
    }
  });

  if(runTest){
    describe('Get Endpoints', () => {
      it('should get the rocket', async () => {
        const res = await request(app)
          .get(`/api/rockets/${generatedUuid}`)
          .set('Accept','application/json');
        expect(res.statusCode).toEqual(201)
        expect(res.body.name).toEqual('testName')
        expect(res.body.takeOffThrust).toBe(0)
      })
    })
  }
});